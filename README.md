## Formatos para acesso das rotas

#### POST **/create-card**
- o header deve incluir uma propriedade chamada ***x-api-key***, com a api key de uma companhia cadastrada no banco de dados
- formato do body

```
{
	employeeId: 1,
	cardType:  'health',
	isVirtual: true
}
```

#### PUT **/create-card**
o header deve incluir uma propriedade chamada ***x-api-key***, com a api key de uma companhia cadastrada no banco de dados
- formato do body

```
{
	cardNumber: "5854-5852-5841-5825"
	codeCvc: "012",
	cardHolderName: "Kate K Arnold",
	expirationDate: "05/19"
	password: "1234"
}
```

#### POST **/recharge-card/:id**
o header deve incluir uma propriedade chamada ***x-api-key***, com a api key de uma companhia cadastrada no banco de dados, deve, também, ser passado como params um id de cartão válido
- formato do body 

```
{
	rechargeAmount: 10000
}
```
- o valor da recarga deve ser informado em centavos, R$ 10,00 = 1000

#### GET /balance-transactions/:id
- deve ser enviado o id do cartão no params


#### POST **/purchases**
- formato do body 

```
{
	cardId: 1,
	password: "1234",
	businessId: 2,	
	amount: 10000
}
```
- o valor da compra (**amount**) deve ser informado em centavos, R$ 10,00 = 1000

#### PATCH **/block-card**
- formato do body 

```
{
	cardId: 2,
	password: "1234"()
}
```
