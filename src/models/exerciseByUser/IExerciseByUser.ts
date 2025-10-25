import { DistanceUnitEnum } from '@/shared/enums/DistanceUnitEnum';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';
import { IdType } from '../../shared/types/IdType';
import { WeekDaysEnum } from '@/shared/enums/WeekDayEnum';
export interface IExerciseByUser extends IDefaultEntityProperties {
    // required
    userId: IdType;
    academyId: IdType;
    exerciseId: IdType;

    // cardio
    distance?: number;
    distanceUnit?: DistanceUnitEnum; // e.g., kilometers, miles

    // bodybuilding | mobility | stretching
    clientWeight?: number;
    repetitions?: number[];
    sets?: number;

    // all types
    exerciseOrientations?: string;
    duration?: number;
    goal?: string;
    weekDays?: WeekDaysEnum[];
}