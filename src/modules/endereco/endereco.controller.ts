import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/enderecos')
@ApiTags('enderecos')
export class EnderecoController {}
