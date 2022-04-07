import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CadastrarEnderecoService } from './services/cadastrar-endereco.service';
import { Endereco } from './model/endereco.model';
import { EnderecoBodyJson } from './interfaces/endereco-body-json.interface';

@Controller('/api/v1/enderecos')
@ApiTags('enderecos')
@ApiBearerAuth('defaultBearerAuth')
export class EnderecoController {
  constructor(
    private readonly cadastrarenderecoService: CadastrarEnderecoService,
  ) {}

  @Post('cadastrar')
  @ApiBody({ type: EnderecoBodyJson })
  async cadastrarEndereco(
    @Body() { numero, cep }: EnderecoBodyJson,
  ): Promise<Endereco> {
    return await this.cadastrarenderecoService.execute({
      cep,
      numero,
    });
  }
}
