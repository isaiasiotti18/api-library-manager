import { UsuarioRepository } from './../usuario.repository';
import { StatusAcesso } from './../enums/status_acesso.enum';
import { Injectable } from '@nestjs/common';
import { ConsultarUsuarioPorIdService } from './consultar-usuario-porId.service';

@Injectable()
export class ConsultarUsuarioBloqueadoService {
  constructor(
    private readonly consultarUsuarioPorIdService: ConsultarUsuarioPorIdService,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute(usuario_id: string) {
    const consultaUsuarioComStatusBloqueado =
      await this.usuarioRepository.findOne({
        where: {
          id: usuario_id,
          status_acesso: StatusAcesso.BLOQUEADO,
        },
      });

    if (consultaUsuarioComStatusBloqueado) {
      return {
        message: `${consultaUsuarioComStatusBloqueado.nome} bloqueado. Contate o Administrador ou Suporte.`,
        bloqueado: true,
        motivo: '',
      };
    }

    return;
  }
}
