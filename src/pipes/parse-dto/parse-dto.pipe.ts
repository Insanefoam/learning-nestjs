import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ObjectSchema } from "@hapi/joi";

@Injectable()
export class ParseDtoPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, _: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException(
        "Uncorrect DTO for card creation",
        HttpStatus.FORBIDDEN,
      );
    } else {
      return value;
    }
  }
}

// @Injectable()
// export class ParseCardDtoPipe implements PipeTransform {
//   transform(value: CreateCardDto, metadata: ArgumentMetadata) {
//     if (value.columnId && value.id && value.title && value.commentsIds) {
//       return value;
//     } else {
//       throw new HttpException(
//         "Uncorrect DTO for card creation",
//         HttpStatus.FORBIDDEN,
//       );
//     }
//   }
// }
