import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CriarEnderecoDTO } from './dtos/criar-endereco.dto';
import { EnderecoService } from './endereco.service';
import { Endereco } from './model/endereco.model';
import { EnderecoBodyJson } from './interfaces/endereco-body-json.interface';

@Controller('/api/v1/enderecos')
@ApiTags('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
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
