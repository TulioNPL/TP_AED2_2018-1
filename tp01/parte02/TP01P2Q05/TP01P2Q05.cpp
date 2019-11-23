/**
*Autor: Tulio N. Polido Lopes
*Data: 23/03/2018
*Objetivo: Refazer a questao 2 da parte 2 do TP01 em C
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
 
#define MAXTAM    5000
#define bool      short
#define true      1
#define false     0
 
typedef struct Partida{
		int copa;
		int placar1;
   		int placar2;
  		int dia;
 		int mes;
		char etapa[100];
		char time1[100];
 		char time2[100];
 		char local[100];
}Partida;

Partida array[MAXTAM];   // Elementos da lista 
int n;               // Quantidade de array.
 
/**
* Inicializacoes
*/
void start(){
   	n = 0;
}//fim start()
 
 
/**
* Insere um elemento na primeira posicao da lista e move os demais elementos para o fim da Lista
* @param x int elemento a ser inserido.
*/
void inserirInicio(Partida x) {
   	int i;
 
   	//validar insercao
  	if(n >= MAXTAM){
      		printf("Erro ao inserir!");
      		exit(1);
   	}//fim if 
 
   	//levar elementos para o fim do array
   	for(i = n; i > 0; i--){
      		array[i] = array[i-1];
   	}//fim for
 
   	array[0] = x;
   	n++;
}//fim inserirInicio()
 
 
/**
 * Insere um elemento no fim do array
 * @param x int elemento a ser inserido.
 */
void inserirFim(Partida x) {
 
   	//validar insercao
   	if(n >= MAXTAM){
      		printf("Erro ao inserir!");
      		exit(1);
   	}//fim if
 
   	array[n] = x;
   	n++;
}//fim inserirFim()
 
 
/**
 * Insere um valor na posicao desejada
 * @param int x, valor a ser inserido
 * @param int pos, posicao em que o valor sera inserido
 */
void inserir(Partida x, int pos) {
   	int i;
 
   	//validar insercao
   	if(n >= MAXTAM || pos < 0 || pos > n){
      		printf("Erro ao inserir!");
      		exit(1);
   	}//fim if
 
   	//levar elementos para o fim do array
   	for(i = n; i > pos; i--){
      		array[i] = array[i-1];
   	}//fim for
 
   	array[pos] = x;
   	n++;
}//fim inserir()
 
 
/**
 * Remove um valor do inicio do array
 * @reuturn int resp, retorna o valor removido
 */
Partida removerInicio() {
   	int i;
	Partida resp;
 
   	//validar remocao
   	if (n == 0) {
      	printf("Erro ao remover!");
     		exit(1);
   	}//fim if
 
   	resp = array[0];
   	n--;
 
   	for(i = 0; i < n; i++){
      		array[i] = array[i+1];
   	}//fim for
 	printf("(R) %d - %s - %s x %s\n",resp.copa,resp.etapa,resp.time1,resp.time2);
   	return resp;
}//fim removerInicio()
 
 
/**
 * Faz uma remocao no fim do array
 * @return int array[--n], retorna o valor removido
 */
Partida removerFim() {
 
   	//validar remocao
   	if (n == 0) {
      		printf("Erro ao remover!");
      		exit(1);
   	}//fim if
 	printf("(R) %d - %s - %s x %s\n",array[n-1].copa,array[n-1].etapa,array[n-1].time1,array[n-1].time2);
   	return array[--n];
}//fim removerFim()
 
 
/**
 *Faz uma remocao numa posicao escolhida
 *@param int pos, posicao a sofrer remocao
 *@return int resp, valor removido
 */
Partida remover(int pos) {
   	int i;
	Partida resp;
 
   	//validar remocao
   	if (n == 0 || pos < 0 || pos >= n) {
      		printf("Erro ao remover!");
      		exit(1);
   	}//fim if
 
   	resp = array[pos];
   	n--;
 
   	for(i = pos; i < n; i++){
   	   	array[i] = array[i+1];
   	}//fim for
 	printf("(R) %d - %s - %s x %s\n",resp.copa,resp.etapa,resp.time1,resp.time2);
   	return resp;
}//fim remover()
 
 
/**
 * Imprime os valores do array
 */
void mostrar (){
	for(int i = 0; i < n; i++){
		printf("[COPA %d] - %s - %d/%d - %s (%d) x (%d) %s - %s\n",array[i].copa,array[i].etapa,array[i].dia,
								       array[i].mes,array[i].time1,array[i].placar1,
								       array[i].placar2,array[i].time2,array[i].local);
	}//fim for	
}//fim mostrar()
 
/*
*Retira as tags de uma string
*@param char pagina[], string a ser manipulada
*/
void retiraTags(char pagina[]){
	char semTags[50000] = "";
	int isTag = 0;
	char aux;
	int i;

	for(i = 0; i < strlen(pagina); i++){
		aux = pagina[i];
		if(aux == '<'|| aux == '&'){
			isTag = 1;
		}//fim if
	
		if(isTag == 0){
			int tam = strlen(semTags);
			semTags[tam] = pagina[i];
			semTags[tam+1] = '\0';			
		}//fim if

		if(aux == '>' || aux == ';'){
			isTag = 0;
		}//fim if
	}//fim for
	
	strcpy(pagina,semTags);
}//fim retiraPagina()

/*
*Recebe uma String e separa em um vetor de Strings pelo '\n'
*@param char str1[], String a ser quebrada
*@param char newString[[][], vetor de Strings a receber as novas Strings formadas
*@return int ctr, retorna a quantidade de Strings formadas
*/
int splitString(char str1[], char newString[1000][100]){
	int i,j,ctr;

    	j=0; ctr=0;
    	for(i=0;i<=(strlen(str1));i++){
        	
        	if(str1[i]=='\n'||str1[i]=='\0'){	//se o char for '\n' ou '\0', newString recebera '\0'
            		newString[ctr][j]='\0';
            		ctr++;  
            		j=0; 
        	}//fim if
        	else{
            		newString[ctr][j]=str1[i];
            		j++;
        	}//fim else
    	}//fim for

	return ctr;
}//fim splitString()
//@param char chave, chave a ser usada para separar a String
int splitString(char str1[], char newString[1000][100], char chave){
        int i,j,ctr;

        j=0; ctr=0;
        for(i=0;i<=(strlen(str1));i++){

                if(str1[i]==chave||str1[i]=='\0'){       //se o char for '\n' ou '\0', newString recebera '\0'
                        newString[ctr][j]='\0';
                        ctr++;
                        j=0;
                }//fim if
                else{
                        newString[ctr][j]=str1[i];
                        j++;
                }//fim else
        }//fim for

        return ctr;
}//fim splitString()


/*
*Recebe uma String e tira os espacos vazios
*@param char string[], a string a ser modificada
*/
void trim(char string[]){
	char aux[100] = "";
	bool gravar = false;

	for(int i = 0; i < strlen(string); i++){	//retira os espacos vazios no incio da string
		if(string[i] != ' '){
			gravar = true;
		}//fim if
	
	if(gravar){
			int tam = strlen(aux);
                        aux[tam] = string[i];
                        aux[tam+1] = '\0';
		}//fim if
	}//fim for

	if(aux[strlen(aux)-1] == ' '){	//retira o espaco vazio na ultima posicao
		aux[strlen(aux)-1] = '\0';
	}//fim if

	strcpy(string,aux);
}//fim trim()

/*
*Retorna o dia da partida
*@param char dados[], String contendo o dia
*@return int dia, valor inteiro do dia
*/
int pegaDia(char dados[100]){
	int dia = 0;
	char d[3] = "";

	d[0] = dados[0];
	d[1] = dados[1];
	d[2] = '\0';
	dia = atoi(d);

	return dia;
}//fim pegaDia()

/*
*Retorna o mes da partida
*@param char dados[], String contendo o mes
*@return int mes, valor inteiro do mes
*/
int pegaMes(char dados[100]){
	int mes = 0;
	char m[3] = "";

	m[0] = dados[3];
	m[1] = dados[4];
	m[2] = '\0';
	mes = atoi(m);

	return mes;
}//fim pegaMes()

/*
*Retorna o placar do time 1
*@param char dados[], String contendo os placares
*@return int placar1, valor inteiro do placar 1
*/
int pegaPlacar1(char dados[100]){
	int placar1;
	char p1[5] = "";
	int tam = strlen(p1);

	//Pega os caracteres ate atingir o ' '
	for(int i = 0; i < strlen(dados); i++){
		if(dados[i] == ' '){
			i = strlen(dados);
		}//fim if
		else{
			p1[tam] = dados[i];
			tam++;
		}//fim else
	}//fim for
	p1[tam] = '\0';
	placar1 = atoi(p1);
	return placar1;
}//fim pegaPlacar1()

/*
*Retorna o placar do time 2
*@param char dados[], String contendo os placares
*@return int placar2, valor inteiro do placar2
*/
int pegaPlacar2(char dados[100]){
	int placar2;
	char p2[5] = "";
	int tam = strlen(p2);
	bool ler = false;

	//Pega os caracteres apos o ' x '
	for(int i = 0; i < strlen(dados) && dados[i] != '\0'; i++){
                if(dados[i] == 'x'){
                        ler = true;
			i+=2;	//pula o ' ' apos  'x'
                }//fim if
                if(ler){
			p2[tam] = dados[i];	
			tam++;
		}//fim if
        }//fim for
        p2[tam] = '\0';
        placar2 = atoi(p2);

	return placar2;
}//fim pegaPlacar2()

/*
*Remove do Array as linhas em branco
*@param char dados[][], array a sofrer remocoes
*@param int ctr, quantidade de linhas com dados
*@return int cont, quantidade de Strings apos as remocoes
*/
int removeLinhaVazia(char dados[][100], int ctr){
	char temp[ctr][100];
	int cont = 0;

	for(int i = 0; i < ctr; i++){
		if(dados[i][0] != '\0'){
			strcpy(temp[cont],dados[i]);
			cont++;	
		}//fim if
	}//fim for

	for(int i = 0; i < cont; i++){
		strcpy(dados[i],temp[i]);
	}//fim for

	return cont;
}//fim removeLinhasVazias()

/*
*Recebe os dados e cria as partidas
*@param int copa, ano referente ao arquivo a ser aberto
*@param partidas, um array de structs Partida que receberao as informacoes
*@param char vetorDados[][], vetor de string com os dados da copa
*@param int qtd, quantidade de partidas existentes
*/
void criaPartidas(int copa,Partida partidas[],char dados[][100],int ctr, int qtd){
	bool ehEtapa;
	int ano = copa,
	    cont = 0,
	    placar1 = 0,
	    placar2 = 0,
    	    dia = 0,
	    mes = 0;

	char etapa[100] = "";
	char time1[100] = "";
	char time2[100] = "";
	char local[100] = "";

	for(int i = 0; i < qtd; i++){
		ehEtapa = (strstr(dados[cont],"GRUPO") != NULL) || (strstr(dados[cont],"FINAL") != NULL) || (strstr(dados[cont],"Disp.") != NULL);

		if(ehEtapa){
			strcpy(etapa,dados[cont]);
			cont++;
		}//fim if

		int aux = cont;

		do{
			if(cont == aux){
				dia = pegaDia(dados[cont]);
				mes = pegaMes(dados[cont]);
			} else if(cont == aux+2) {
				placar1 = pegaPlacar1(dados[cont]);
				placar2 = pegaPlacar2(dados[cont]);
			} else if(cont == aux+1) {	//posicao time1
				strcpy(time1,dados[cont]);
			} else if(cont == aux+3) {	//posicao time 2
				strcpy(time2,dados[cont]);
			} else if(cont == aux+4) {	//posicao local
				strcpy(local,dados[cont]);
			}//fim else if
			cont++;
		}while((cont < ctr)&&(strstr(dados[cont],"/")==NULL));

		ehEtapa = (strstr(dados[cont-1],"GRUPO") != NULL)||(strstr(dados[cont-1],"FINAL") != NULL)||(strstr(dados[cont-1],"Disp.") != NULL);

		if (ehEtapa){	//se a posicao anterior for uma etapa, cont voltara uma posicao.
				cont--;
		}//fim if
	
		partidas[i].placar1 = placar1;
		partidas[i].placar2 = placar2;
		partidas[i].dia = dia;
		partidas[i].mes = mes;
		partidas[i].copa = ano;
		strcpy(partidas[i].etapa,etapa);
		strcpy(partidas[i].local,local);
		strcpy(partidas[i].time1,time1);
		strcpy(partidas[i].time2,time2);
	}//fim for
}//fim criaPartidas()

/*
*Faz a leitura do html e pega as informacoes uteis
*@param int copa, ano referente ao arquivo a ser aberto
*@param Partida partidas[], Um array de structs Partida que receberao as informacoes
*@return int qtdPartidas, contagem da quantidade de partidas
*/
int ler(int copa, Partida partidas[]){
	int qtdPartidas = 0;
	bool ler = false;
	FILE *arq;
	char pagina[50000] = ""; 
	char arquivo[] = "/tmp/copa/";
	char ano[5];
	sprintf(ano,"%i",copa);
	strcat(arquivo, ano);
	strcat(arquivo , ".html");

	arq = fopen(arquivo, "r");
	if(arq == NULL){
		printf("\nErro ao abrir o arquivo!\n");
	}//fim if
	else{
		char linha[100];
		fgets(linha, sizeof linha, arq);

		do{
			if(strstr(linha,"<table cellspacing=\"1\">") != NULL){
				ler = true;
			}//fim if
			if(ler){
				strcat(pagina, linha);
			}//fim if
			fgets(linha, sizeof linha, arq);
		}while(strstr(linha, "<tr bgcolor=\"#000000\">") == NULL);
		fclose(arq);
	}//fim else

	retiraTags(pagina);
	char vetorDados[1000][100];
	int ctr = splitString(pagina,vetorDados);

	for(int i=0;i < ctr;i++){
                trim(vetorDados[i]);
		if(strstr(vetorDados[i], "/") != NULL){
			qtdPartidas++;
		}//fim if
        }//fim for
	ctr = removeLinhaVazia(vetorDados,ctr);

	criaPartidas(copa,partidas,vetorDados,ctr,qtdPartidas);	
	return qtdPartidas;
}//fim ler()

/*
*Faz a leitura das entradas
*@param int copas[], array onde serao armazenadas as entradas
*@return int qtdCopas, retorna a quantidade de entradas
*/
int leEntrada(int copas[]){
	int qtdCopas = 0;
	
	do{
		scanf("%d", &copas[qtdCopas]);	
	}while(copas[qtdCopas++] != 0);
	qtdCopas--;	//Desconsidera o valor 0

	return qtdCopas;
}//fim leEntrada 

/**
*Executa os comandos dados pelo usuario
*@param char comando[], comando a ser executado
*/
void executor(char comandos[]){
	char comando[4][100];
	int year;
	int pos;

	int ctr = splitString(comandos,comando,' ');
	ctr = removeLinhaVazia(comando,ctr);

	for(int i = 0; i < ctr; i++){
	}//fim for

	switch(comando[0][0]){
		case 'I':
			Partida partida[100];
			year = atoi(comando[1]);
			ler(year,partida);
			pos = atoi(comando[2]);

			if(comando[0][1] == 'I'){
				inserirInicio(partida[pos-1]);
			}//fim if
			else if(comando[0][1] == 'F'){	
				inserirFim(partida[pos-1]);
			}//fim else if
			else if(comando[0][1] == '*'){
				int pos2 = atoi(comando[3]);
				inserir(partida[pos-1],pos2);
			}//fim else
			break;

		case 'R':
			if(comando[0][1] == 'I'){
				removerInicio();	
			}//fim if
			else if(comando[0][1] == 'F'){
				removerFim();
			}//fim else if
			else if(comando[0][1] == '*'){
				pos = atoi(comando[1]);
				remover(pos);
			}//fim else
			break;
	}//fim switch


}//fim executor()
 
int main(int argc, char** argv){
	start();
	int qtdPartidas;
	int copas[1000];
	int qtdCopas = leEntrada(copas); //Le as copas e conta sua qtd
	int qtdCom;
	scanf("%d", &qtdCom);	//Le a qtd de comandos
	char comandos[qtdCom][100];
	
	for(int i = 0; i <= qtdCom; i++){	//ciclo para leitura dos comandos
		fgets(comandos[i], sizeof comandos[i], stdin);
	}//fim for

	for(int i = 0; i < qtdCopas; i++){
		Partida partidas[100];
		qtdPartidas = ler(copas[i], partidas);
		for(int j = 0; j < qtdPartidas; j++){
			inserirFim(partidas[j]);
		}//fim for
	}//fim for
	
	for(int i = 0; i <= qtdCom; i++){
		executor(comandos[i]);
	}//fim for

	mostrar();

}//fim main()
