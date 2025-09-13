
import { BlockTypeEnum } from '../../shared/enums/BlockTypeEnum';
import { IdType } from '../../shared/types/IdType';
import { IDefaultEntityProperties } from '../../shared/interfaces/IDefaulEntityProperties';

/**
 * Represents an exercise block entity with properties for identification,
 * categorization, and optional image representation.
 * 
 * @extends IDefaultEntityProperties
 * 
 * @property {string} name - The name of the exercise block.
 * @property {string} [imagePath] - Optional path to an image representing the exercise block.
 * @property {IdType} academyId - The identifier of the academy associated with the exercise block.
 * @property {BlockTypeEnum} exerciseType - The type of exercise block, used for informational purposes 
 * (e.g., cardio, strength, endurance, mobility).
 */
export interface IExerciseBlock extends IDefaultEntityProperties {
  name: string;
  imagePath?: string;
  academyId: IdType;
  exerciseType: BlockTypeEnum;
}
