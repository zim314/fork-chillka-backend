import { Model, Schema, model } from 'mongoose';
import {
  ActivitySchemaModel,
  CategoryEnum,
  DayEnum,
  PeriodEnum,
  StatusEnum,
  TicketModeEnum,
  TypeEnum,
  WeekEnum,
} from '../type/activity.type';

type ActivityModel = Model<ActivitySchemaModel, object>;

const ActivitySchema = new Schema<ActivitySchemaModel, ActivityModel>(
  {
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
    cover: {
      type: [{ type: Schema.Types.String, url: Schema.Types.String }],
    },
    thumbnail: {
      type: Schema.Types.String,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    startDateTime: {
      type: Schema.Types.Date,
    },
    fromToday: {
      type: Schema.Types.Boolean,
    },
    endDateTime: {
      type: Schema.Types.Date,
    },
    noEndDate: {
      type: Schema.Types.Boolean,
    },
    price: {
      type: Schema.Types.Number,
    },
    category: {
      type: Schema.Types.String,
      enum: CategoryEnum,
    },
    type: {
      type: Schema.Types.String,
      enum: TypeEnum,
    },
    link: {
      type: Schema.Types.String,
    },
    location: {
      type: Schema.Types.String,
    },
    address: {
      type: Schema.Types.String,
    },
    summary: {
      type: Schema.Types.String,
    },
    details: {
      type: Schema.Types.String,
    },
    isPrivate: {
      type: Schema.Types.Boolean,
    },
    displayRemainingTickets: {
      type: Schema.Types.Boolean,
    },
    isRecurring: {
      type: Schema.Types.Boolean,
    },
    recurring: {
      period: {
        type: Schema.Types.String,
        enum: PeriodEnum,
      },
      week: {
        type: Schema.Types.String,
        enum: WeekEnum,
      },
      day: {
        type: Schema.Types.String,
        enum: DayEnum,
      },
    },
    ticketMode: {
      type: Schema.Types.String,
      enum: TicketModeEnum,
    },
    status: {
      type: Schema.Types.String,
      enum: StatusEnum,
    },
    customField: {
      type: Schema.Types.Boolean,
    },
    ticketRequired: {
      type: Schema.Types.Boolean,
    },
    participantAmount: {
      type: Schema.Types.Number,
    },
    checkedInParticipantsAmount: {
      type: Schema.Types.Number,
    },
  },
  {
    collection: 'activities',
    timestamps: true,
  }
);

ActivitySchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'activityId',
});

ActivitySchema.virtual('messageLists', {
  ref: 'MessageList',
  localField: '_id',
  foreignField: 'activityId',
});

const Activity = model<ActivitySchemaModel, ActivityModel>(
  'Activity',
  ActivitySchema
);

export default Activity;
