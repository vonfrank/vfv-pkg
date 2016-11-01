import { Field } from './field';
import { User } from './user';
import { StudyDetails } from './study-details';

export class Study {
    Id: number;
    AvailableFields: Field[];
    AssignedUsers: User[];
    StudyDetails: StudyDetails;
}
