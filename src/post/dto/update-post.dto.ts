import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePostDTO } from './create-post.dto';

export class UpdatePostDTO extends PartialType(OmitType(CreatePostDTO, [])) {}
