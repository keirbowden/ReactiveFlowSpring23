public with sharing class PublicationsController 
{
    @AuraEnabled(cacheable=true)
    public static List<Publication__c> GetPublications(){
        try {
            return [select Id, Name, Publishes_Weekends__c from Publication__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}