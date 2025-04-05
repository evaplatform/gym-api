export interface IExercise {
    id: string;
    name: string;  // unique
    academyId: string; // point to academy collection
    exerciseBlockId: string;
    description?: string;
    video?: string;
    imagePath?: string;
    videoPath?: string;
    createdAt: Date;
    updatedAt?: Date;
}