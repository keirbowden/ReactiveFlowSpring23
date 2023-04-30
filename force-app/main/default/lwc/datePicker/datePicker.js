import { api, LightningElement, track } from 'lwc';

const SHORT_DAYS=['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FULL_DAYS=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const FULL_WEEKS=[{num: 1,
    days: [ {num: 131, dayNum: 31, class: "slds-day_adjacent-month"},
            {num: 101, dayNum: 1, class: ""},
            {num: 102, dayNum: 2, class: ""},
            {num: 103, dayNum: 3, class: ""},
            {num: 104, dayNum: 4, class: ""},
            {num: 105, dayNum: 5, class: ""},
            {num: 106, dayNum: 6, class: ""}
          ],
    },
    {num: 2,
        days: [ {num: 207, dayNum: 7, class: ""},
                {num: 208, dayNum: 8, class: ""},
                {num: 209, dayNum: 9, class: ""},
                {num: 210, dayNum: 10, class: ""},
                {num: 211, dayNum: 11, class: ""},
                {num: 212, dayNum: 12, class: ""},
                {num: 213, dayNum: 13, class: ""}
              ],
    },                
    {num: 3,
        days: [ {num: 314, dayNum: 14, class: ""},
                {num: 315, dayNum: 15, class: ""},
                {num: 316, dayNum: 16, class: ""},
                {num: 317, dayNum: 17, class: ""},
                {num: 318, dayNum: 18, class: ""},
                {num: 319, dayNum: 19, class: ""},
                {num: 320, dayNum: 20, class: ""}
              ],
    },                
    {num: 4,
        days: [ {num: 421, dayNum: 21, class: ""},
                {num: 422, dayNum: 22, class: ""},
                {num: 423, dayNum: 23, class: ""},
                {num: 424, dayNum: 24, class: ""},
                {num: 425, dayNum: 25, class: ""},
                {num: 426, dayNum: 26, class: ""},
                {num: 427, dayNum: 27, class: ""}
              ],
    },                
    {num: 5,
        days: [ {num: 528, dayNum: 28, class: ""},
                {num: 529, dayNum: 29, class: ""},
                {num: 530, dayNum: 30, class: ""},
                {num: 501, dayNum: 1, class: "slds-day_adjacent-month"},
                {num: 502, dayNum: 2, class: "slds-day_adjacent-month"},
                {num: 503, dayNum: 3, class: "slds-day_adjacent-month"},
                {num: 504, dayNum: 4, class: "slds-day_adjacent-month"}
              ]
    }
];

export default class DatePicker extends LightningElement {
    @track weeks=FULL_WEEKS;
    @track days=FULL_DAYS;
    shortWeeks;
    
    @api get weekends() {
        return this.weeks==FULL_WEEKS;
    }

    set weekends(value) {
        console.log('Weekends changed to ' + value);
        try {
        if (value) {
            this.weeks=FULL_WEEKS;
            this.days=FULL_DAYS;
        }
        else {
            if (!this.shortWeeks) {
                this.shortWeeks=[];
                for (const week of FULL_WEEKS) {
                    const newWeek={num: week.num,
                             days: []};
                    for (let idx=1; idx<6; idx++) {
                        newWeek.days.push(week.days[idx]);
                    }
                    this.shortWeeks.push(newWeek);
                }
            }

            this.weeks=this.shortWeeks;
            this.days=SHORT_DAYS;
        }
    } catch (ex) { console.log('Exception ' + ex); }

        console.log('Weeks = ' + JSON.stringify(this.weeks, null, 4));
    }

}