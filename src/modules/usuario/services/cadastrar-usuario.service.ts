import { UsuarioRepository } from './../usuario.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EnderecoBodyJson } from 'src/modules/endereco/interfaces/endereco-body-json.interface';
import { CadastrarEnderecoService } from 'src/modules/endereco/services/cadastrar-endereco.service';
import { CriarUsuarioDTO } from '../dtos/criar-usuario.dto';
import { Usuario } from '../model/usuario.model';
import * as bcrypt from 'bcrypt';
import { ConsultarUsuarioPorEmailService } from './consultar-usuario-por-email.service';

@Injectable()
export class CadastrarUsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly cadastrarEnderecoService: CadastrarEnderecoService,
    private readonly consultarUsuarioPorEmailService: ConsultarUsuarioPorEmailService,
  ) {}
  async execute(
    criarUsuarioDTO: CriarUsuarioDTO,
    enderecoBodyJson: EnderecoBodyJson,
  ): Promise<Usuario> {
    try {
      const { cpf, email, nome, telefone, senha } = criarUsuarioDTO;
      const { cep, numero } = enderecoBodyJson;

      const cpfFormatado = cpf.replace(/[^\d]+/g, '');
      const telefoneFormatado = telefone.replace(/[^\d]+/g, '');

      await this.consultarUsuarioPorEmailService.execute(email);

      const novoEndereco = await this.cadastrarEnderecoService.execute({
        cep,
        numero,
      });

      const novoUsuario = await this.usuarioRepository.criarUsuario({
        nome,
        email,
        senha: await bcrypt.hash(senha, 10),
        cpf: cpfFormatado,
        telefone: telefoneFormatado,
        endereco_id: novoEndereco.endereco_id,
      });

      return {
        ...novoUsuario,
        password: undefined,
      };
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }
}
