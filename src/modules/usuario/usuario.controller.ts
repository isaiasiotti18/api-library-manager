import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller('api/v1/usuarios')
@ApiTags('usuarios')
export class UsuarioController {}
