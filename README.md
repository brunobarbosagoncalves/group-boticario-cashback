# group-boticario-cashback

# instalando yarn

https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable

# iniciar e instalar o servidor

yarn dev

# documentação e api (SWAGGER)

http://localhost:8181/v1/api/docs

# Enunciado

## Rota para cadastrar um novo revendedor(a) exigindo no mínimo nome completo, CPF, e- mail e senha;

OK

## Rota para validar um login de um revendedor(a);

OK

## Rota para cadastrar uma nova compra exigindo no mínimo código, valor, data e CPF do revendedor(a), Todos os cadastros são salvos com o status “Em validação” exceto quando o CPF do revendedor(a) for 153.509.460-56, neste caso o status é salvo como “Aprovado”;

Informações como valor do produto, data, CPF são recuperados do banco para maior segurança
-O front apenas envia qual Id do produto e quantidade

## Rota para listar as compras cadastradas retornando código, valor, data, % de cashback aplicado para esta compra, valor de cashback para esta compra e status;

Esse item ficou mal explicado se o valor do cashback é calculado usando o valor da venda unitaria ou se é o calculo de todas as vendas do mês baseada nela são calculado o cashback dos produtos

## Rota para exibir o acumulado de cashback até o momento, essa rota irá consumir essa informação de uma API externa disponibilizada pelo Boticário.

Esse item não serve para nenhum calculo pois o valor é mock, mas como pede o requisito esta sendo feito a consulta na API

## Diferencial:

    Auth JWT
        -Ok
    Log da aplicação
        -Ok, Sendo feita no terminal
    Testes unitários;
        -Ok, via Swagger
    Testes unitários;
        -Ok, via Swagger
