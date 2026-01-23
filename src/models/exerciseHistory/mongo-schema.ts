import mongoose from 'mongoose';
import { MONGO_DEFAULT_PROPERTIES } from '../../shared/constants/mongoDefaultProperties';
import { DistanceUnitEnum } from '@/shared/enums/DistanceUnitEnum';
import { IExerciseHistory } from './IExerciseHistory';

const ExerciseHistorySchema = new mongoose.Schema<IExerciseHistory>(
  {
    // Relações
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'ID do usuário que realizou o exercício.'
    },
    academyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Academy',
      required: true,
      description: 'ID da academia associada ao exercício.'
    },
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
      description: 'ID do exercício realizado.'
    },

    // Dados gerais do treino
    completedAt: {
      type: Date,
      required: true,
      description: 'Data e hora de conclusão do exercício.'
    },
    duration: {
      type: Number,
      required: true,
      description: 'Duração do exercício em segundos ou minutos.'
    },
    notes: {
      type: String,
      maxlength: 2000,
      required: false,
      description: 'Observações do usuário sobre o treino.'
    },

    // Para exercícios de musculação/mobilidade/alongamento
    completedSets: {
      type: Number,
      required: false,
      description: 'Número de séries concluídas.'
    },
    completedRepetitions: [{
      type: Number,
      required: false,
      description: 'Array de repetições concluídas.'
    }],
    weightUsed: {
      type: Number,
      required: false,
      description: 'Peso utilizado no exercício.'
    },

    // Para exercícios cardio (corrida, etc.)
    distance: {
      type: Number,
      required: false,
      description: 'Distância percorrida no exercício.'
    },
    distanceUnit: {
      type: String,
      enum: Object.values(DistanceUnitEnum),
      required: false,
      description: 'Unidade de distância (ex: km, milha).'
    },
    pace: {
      type: Number,
      required: false,
      description: 'Ritmo em segundos por km/milha.'
    },
    averageHeartRate: {
      type: Number,
      required: false,
      description: 'Frequência cardíaca média.'
    },
    maxHeartRate: {
      type: Number,
      required: false,
      description: 'Frequência cardíaca máxima.'
    },

    // Dados de GPS para corrida
    startLocation: {
      type: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
      required: false,
      description: 'Localização inicial (latitude, longitude).'
    },
    endLocation: {
      type: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
      required: false,
      description: 'Localização final (latitude, longitude).'
    },
    routePoints: [{
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }],

    speedAverage: {
      type: Number,
      required: false,
      description: 'Velocidade média em km/h ou milhas/h.'
    },
    paceAverage: {
      type: String,
      maxlength: 10,
      required: false,
      description: 'Ritmo médio no formato "mm:ss".'
    },

    // Dados de progresso
    perceivedEffort: {
      type: Number,
      min: 1,
      max: 10,
      required: false,
      description: 'Esforço percebido (escala 1-10).'
    },
    feelingScore: {
      type: Number,
      min: 1,
      max: 5,
      required: false,
      description: 'Como o usuário se sentiu (escala 1-5).'
    },

    // Status do exercício
    completed: {
      type: Boolean,
      required: true,
      description: 'Indica se o exercício foi concluído.'
    },
    partiallyCompleted: {
      type: Boolean,
      required: false,
      description: 'Indica se o exercício foi parcialmente concluído.'
    }
  },
  { ...MONGO_DEFAULT_PROPERTIES }
);

export const ExerciseHistoryModel = mongoose.model<IExerciseHistory>('ExerciseHistory', ExerciseHistorySchema);
