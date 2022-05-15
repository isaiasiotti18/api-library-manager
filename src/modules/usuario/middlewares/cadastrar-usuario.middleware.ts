import { validate } from 'class-validator';
import { CriarUsuarioDTO } from './../dtos/criar-usuario.dto';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class CadastrarUsuarioMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: (error?: any) => void) {
    const body = req.body;

    const criarUsuarioDTO = new CriarUsuarioDTO();

    criarUsuarioDTO.cpf = body.cpf;
    criarUsuarioDTO.email = body.email;
    criarUsuarioDTO.nome = body.nome;
    criarUsuarioDTO.password = body.password;
    criarUsuarioDTO.telefone = body.telefone;

    const validations = await validate(criarUsuarioDTO);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}
