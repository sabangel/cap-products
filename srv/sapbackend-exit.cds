using {sapbackend as external} from './external/sapbackend.csn';

define service SapBackendExit {
    @cds.persistence: {
        table,
        skip: false
    }
    @cds.autoexpose
    //entity Incidents as select from external.IncidentsSet;
    //Se recomienda exponerlo como una proyección 
    entity Incidents as projection on external.IncidentsSet;
}

@protocol: 'rest'
service RestService{
    entity Incidents as projection on SapBackendExit.Incidents;
}