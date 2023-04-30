import { api, LightningElement, track, wire } from 'lwc';
import GetPublications from '@salesforce/apex/PublicationsController.GetPublications'
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class PublicationPicker extends LightningElement {
    publications; 
    @track pubOptions=[{label: 'Id', value: 1}];
    _publishesWeekends;
    chosenPublication;
    
    @api get publishesWeekends() {
        return this._publishesWeekends;
    }

    set publishesWeekends(value) {
        this._publishesWeekends=value;
    }

    @api weekends;
    @wire (GetPublications)
    gotPublications({error, data}) {
        console.log('Got publications');
        if (data) {
            this.publications=data;
            const newOptions=[];
            for (const publication of this.publications) {
                newOptions.push({label: publication.Name, value: publication.Id});
            }
            this.pubOptions=newOptions;
        }
        else if (error) {
            let errors=reduceErrors(error).reduce((accumulator, currentValue) => accumulator.concat(', ', currentValue), '');
            this.showError('Unable to retrieve accounts', errors.substring(2));
        }
        console.log('Pub options  = ' + JSON.stringify(this.pubOptions, null, 4));
    }
    
    publicationChanged(event) {
        try {
        this.chosenPublication=event.target.value;

        let publishesWeekends=null;
        for (const publication of this.publications) {
            if (publication.Id==this.chosenPublication) {
                publishesWeekends=publication.Publishes_Weekends__c;
            }
        }

        if (null!=publishesWeekends) {
            this._publishesWeekends=publishesWeekends;
            this.dispatchEvent(new FlowAttributeChangeEvent('publishesWeekends', this._publishesWeekends));                 
        }
    }
    catch (ex) {
        console.log('Exception ' + ex);
    }
    }
}