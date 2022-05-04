import { AtualizarLivroDTO } from './../dtos/atualizar-livro.dto';
import { AwsS3Service } from '../../../config/utils/aws/aws-s3.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConsultarLivroService } from './consultar-livro.service';
import { AtualizarLivroService } from './atualizar-livro.service';

@Injectable()
export class UploadCapaLivroService {
  constructor(
    private readonly consultarLivroService: ConsultarLivroService,
    private readonly awsS3Service: AwsS3Service,
    private readonly atualizarLivroService: AtualizarLivroService,
  ) {}

  async execute(file: any, isbn_livro: string): Promise<any> {
    const livroJaCadastrado = await this.consultarLivroService.execute(
      isbn_livro,
    );

    if (!livroJaCadastrado) {
      throw new NotFoundException('Livro não foi encontrado.');
    }

    let nomeArquivo = `${livroJaCadastrado.titulo.replace(
      /[^a-z0-9]/gi,
      '-',
    )}-${isbn_livro}`;

    const urlCapaLivro = await this.awsS3Service.uploadArquivo(
      file,
      nomeArquivo.replace(',', '-'),
    );

    const atualizarLivroDTO: AtualizarLivroDTO = {};
    atualizarLivroDTO.urlCapaLivro = urlCapaLivro.url;

    await this.atualizarLivroService.execute(isbn_livro, atualizarLivroDTO);

    return {
      url: urlCapaLivro,
      message: 'Livro Atualizado com Sucesso.',
    };
  }
}
