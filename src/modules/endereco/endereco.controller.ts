import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { EnderecoService } from './endereco.service';
import { Endereco } from './model/endereco.model';
import { EnderecoBodyJson } from './interfaces/endereco-body-json.interface';

@Controller('/api/v1/enderecos')
@ApiTags('enderecos')
@ApiBearerAuth('defaultBearerAuth')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post('cadastrar')
  @ApiBody({ type: EnderecoBodyJson })
  async buscaEndereco(
    @Body() { numero, cep }: EnderecoBodyJson,
  ): Promise<Endereco> {
    return await this.enderecoService.criarEndereco({
      cep,
      numero,
    });
  }

  @Get()
  async consultarEnderecos(): Promise<Endereco[]> {
    return await this.enderecoService.consultarEnderecos();
  }
}
