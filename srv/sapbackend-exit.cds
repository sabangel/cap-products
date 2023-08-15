using {sapbackend as external} from './external/sapbackend.csn';

define service SapBackendExit {
    entity Incidents as
        select from external.IncidentsSet;
}