/**
*Autor: Tulio N. Polido Lopes
*Data: 05/04/2018
*Objetivo: Refazer a questao 4 do TP02 em C
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <locale.h>
#include <err.h>
 
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

typedef struct Time{
	int numPontos;
	int jogos;
	int vitorias;
	int empates;
	int derrotas;
	int golsPro;
	int golsContra;
	int saldoGols;
	char pais[100];
}Time;

//TIPO CELULA ===================================================================
typedef struct CelulaDupla {
    	Time elemento;        // Elemento inserido na celula.
	int pos;	//posicao da CelulaDupla na Lista
    	struct CelulaDupla* prox; // Aponta a celula prox.
   	struct CelulaDupla* ant;  // Aponta a celula anterior.
} CelulaDupla;
 
CelulaDupla* novaCelulaDupla(Time elemento) {
   	CelulaDupla* nova = (CelulaDupla*) malloc(sizeof(CelulaDupla));
	nova->pos = 0;
   	nova->elemento = elemento;
   	nova->ant = nova->prox = NULL;
   	return nova;
}

//LISTA PROPRIAMENTE DITA =======================================================
CelulaDupla* primeiro;
CelulaDupla* ultimo;
int qtdPartidas;	//quantidade de partidas
int qtdTimes; 	//quantidade de times
int comparacoes;	//quantidade de comparacoes
int posLista;	//inteiro para auxiliar nas posicoes das CelulasDuplas

/**
* Inicializacoes
*/
void start(){
	Time t;
   	primeiro = novaCelulaDupla(t);
   	ultimo = primeiro;
	qtdPartidas = 0;
	qtdTimes = 0;
	comparacoes = 0;
	posLista = 0;
}//fim start()
 
/**
 *  Calcula e retorna o tamanho, em numero de elementos, da lista.
 *  @return resp int tamanho
 */
int tamanho() {
        int tamanho = 0;
        CelulaDupla* i;
        for(i = primeiro; i != ultimo; i = i->prox, tamanho++);
        return tamanho;
}//fim tamanho()

 
/**
 * Insere um elemento na primeira posicao da lista.
 * @param x Time elemento a ser inserido.
 */
void inserirInicio(Time x) {
   	CelulaDupla* tmp = novaCelulaDupla(x);
 
   	tmp->ant = primeiro;
   	tmp->prox = primeiro->prox;
   	primeiro->prox = tmp;
   	if (primeiro == ultimo) {                    
      		ultimo = tmp;
   	} else {
      		tmp->prox->ant = tmp;
   	}
   	tmp = NULL;
	posLista++;
}//fim inserirInicio()
 
 
/**
 * Insere um elemento na ultima posicao da lista.
 * @param x Time elemento a ser inserido.
 */
void inserirFim(Time x) {
   	ultimo->prox = novaCelulaDupla(x);
   	ultimo->prox->ant = ultimo;
   	ultimo = ultimo->prox;
	posLista++;
	ultimo->pos = posLista;
}//fim inserirFim()
 
 
/**
 * Insere um elemento em uma posicao especifica considerando que o 
 * primeiro elemento valido esta na posicao 0.
 * @param x Time elemento a ser inserido.
 * @param pos int posicao da insercao.
 * @throws Exception Se <code>posicao</code> invalida.
 */
void inserir(Time x, int pos) {
 
   	int tam = tamanho();
 
   	if(pos < 0 || pos > tam){
      		errx(1, "Erro ao remover (posicao %d/%d invalida!", pos, tam);
   	} else if (pos == 0){
      		inserirInicio(x);
   	} else if (pos == tam){
      		inserirFim(x);
   	} else {
      	// Caminhar ate a posicao anterior a insercao
      		CelulaDupla* i = primeiro;
      		int j;
      		for(j = 0; j < pos; j++, i = i->prox);
 
      		CelulaDupla* tmp = novaCelulaDupla(x);
      		tmp->ant = i;
      		tmp->prox = i->prox;
      		tmp->ant->prox = tmp->prox->ant = tmp;
      		tmp = i = NULL;
		posLista++;
   	}//fim else
}//fim inserir()
 
 
/**
 * Remove um elemento da primeira posicao da lista.
 * @return resp Time elemento a ser removido.
 */
Time removerInicio() {
   	if (primeiro == ultimo) {
      		errx(1, "Erro ao remover (vazia)!");
   	}	
 
   	CelulaDupla* tmp = primeiro;
   	primeiro = primeiro->prox;
   	Time resp = primeiro->elemento;
   	tmp->prox = primeiro->ant = NULL;
   	free(tmp);
   	tmp = NULL;
	posLista--;
   	return resp;
}//fim removerInicio()
 
 
/**
 * Remove um elemento da ultima posicao da lista.
 * @return resp Time elemento a ser removido.
 */
Time removerFim() {
   	if (primeiro == ultimo) {
      		errx(1, "Erro ao remover (vazia)!");
   	} 
   	Time resp = ultimo->elemento;
   	ultimo = ultimo->ant;
   	ultimo->prox->ant = NULL;
   	free(ultimo->prox);
   	ultimo->prox = NULL;
	posLista--;

   	return resp;
}//fim removerFim()
 
/**
 * Remove um elemento de uma posicao especifica da lista
 * considerando que o primeiro elemento valido esta na posicao 0.
 * @param posicao Meio da remocao.
 * @return resp Time elemento a ser removido.
 * @throws Exception Se <code>posicao</code> invalida.
 */
Time remover(int pos) {
   	Time resp;
   	int tam = tamanho();
 
   	if (primeiro == ultimo){
      		errx(1, "Erro ao remover (vazia)!");
   	} else if(pos < 0 || pos >= tam){
      		errx(1, "Erro ao remover (posicao %d/%d invalida!", pos, tam);
   	} else if (pos == 0){
      		resp = removerInicio();
   	} else if (pos == tam - 1){
      		resp = removerFim();
   	} else {
      		// Caminhar ate a posicao anterior a insercao
      		CelulaDupla* i = primeiro->prox;
      		int j;
      		for(j = 0; j < pos; j++, i = i->prox);
 
      		i->ant->prox = i->prox;
      		i->prox->ant = i->ant;
      		resp = i->elemento;
      		i->prox = i->ant = NULL;
      		free(i);
      		i = NULL;
		posLista--;
  	 }//fim else
 
   	return resp;
}//fim remover()

/**
 * Mostra os elementos da lista separados por espacos.
 */
void mostrar() {
   	CelulaDupla* i;
   	for (i = primeiro->prox; i != NULL; i = i->prox) {
		int doidao = i->elemento.numPontos*1000 + i->elemento.golsPro;
      		printf("%s pg(%i) j(%i) v(%i) e(%i) d(%i) gp(%i) gc(%i) sg(%i) d(%i)\n",i->elemento.pais,i->elemento.numPontos,i->elemento.jogos,
										        i->elemento.vitorias,i->elemento.empates,i->elemento.derrotas,
										        i->elemento.golsPro,i->elemento.golsContra,
											i->elemento.saldoGols,doidao);
   	}//fim for
}//fim mostrar()
 
 
/**
 * Mostra os elementos da lista de forma invertida 
 * e separados por espacos.
 */
void mostrarInverso() {
   	CelulaDupla* i;	
   	for (i = ultimo; i != primeiro; i = i->ant){
		int doidao = i->elemento.numPontos*1000 + i->elemento.golsPro;
      		printf("%s pg(%i) j(%i) v(%i) e(%i) d(%i) gp(%i) gc(%i) sg(%i) d(%i)\n",i->elemento.pais,i->elemento.numPontos,i->elemento.jogos,
										        i->elemento.vitorias,i->elemento.empates,i->elemento.derrotas,
										        i->elemento.golsPro,i->elemento.golsContra,
											i->elemento.saldoGols,doidao);
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

	int total = qtdPartidas + qtd;
	for(int i = qtdPartidas; i < total; i++){
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
		qtdPartidas++;
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

	setlocale(LC_ALL, "en_US.ISO-8859-1");
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

/*
*Recebe o pais e analisa se ele deve ou nao ser substituido
*@param char aux[], a String a ser tratada
*/
void trataPais(char aux[]){
		if(strstr(aux,"Iugosl")!=NULL){
			strcpy(aux,"Sérvia");
		}else if(strstr(aux,"Tchecoslov")!=NULL){
			strcpy(aux,"República Tcheca");
		}else if(strstr(aux,"Alemanha Ocidental")!=NULL){
			strcpy(aux,"Alemanha");
		}else if(strstr(aux,"Montenegro")!=NULL){
			strcpy(aux,"Sérvia");
		}else if(strstr(aux,"Sovi")!=NULL){
			strcpy(aux,"Rússia");
		}//fim else if
}//fim trataPais()

/*
*Retorna a posicao do time no array, se ele nao existir, retorna -1
*@param char time[], time a ser procurado
*@param Time times[], array onde ocorrera a procura
*@return int pos, posicao onde o time esta
*/
int retornaPosicao(char time[], Time times[]){
	int pos = -1;
	char aux[100];

	for(int i = 0; i < qtdTimes; i++){
		strcpy(aux,times[i].pais);
		
		if(strcmp(aux,time)==0){
			pos = i;
			i = qtdTimes;
		}//fim if
	}//fim for

	return pos;
}//fim retornaPosciao()

/*
*Troca dois Times de lugar no array
*@param CelulaDupla i, posicao um 
*@param CelulaDupla j, posicao dois
*/
void swap(CelulaDupla* i, CelulaDupla* j){
	Time temp = i->elemento;
      	i->elemento = j->elemento;
      	j->elemento = temp;
}//fim swap()

/*
*Faz um quicksort no Ranking
*@param CelulaDupla esq, inicio do array
*@param CelulaDUpla dir, fim do array
*/
void quicksort(CelulaDupla* esq, CelulaDupla* dir){
	CelulaDupla* i = esq;
	CelulaDupla*  j = dir;
	CelulaDupla* aux = primeiro->prox;
        int meio = (esq->pos+dir->pos)/2;

	while(aux->pos != meio){	//encontra a posicao do meio
		aux = aux->prox;
	}//fim while
	Time pivo = aux->elemento;

        while (i->pos <= j->pos) {
           	while (i->elemento.golsPro < pivo.golsPro) i = i->prox;
            	while (j->elemento.golsPro > pivo.golsPro) j = j->ant;
            	if (i->pos <= j->pos) {
                	swap(i, j);
                	i = i->prox;
                	j = j->ant;
            	}//fim if
		comparacoes++;
        }//fim while

        if (esq->pos < j->pos)  quicksort(esq, j);
        if (i->pos < dir->pos)  quicksort(i, dir);
	comparacoes +=2;
}//fim quicksort()
void quicksort(){
	quicksort(primeiro->prox,ultimo);
}//fim quicksort

/*
*Criar as intancias de time
*@param Partida partidas[], Array de partidas com as informacoes necessarias
*@param Time times[], array de Times que recebera as informacoes
*/
void criaTimes(Partida partidas[], Time times[]){
	int placar1;
	int placar2;
	int posTime1 = -1;
	int posTime2 = -1;
	int vitoriaTime1 = 0;
	int vitoriaTime2 = 0;
	int empateTime1 = 0;
	int empateTime2 = 0;
	int derrotaTime1 = 0;
	int derrotaTime2 = 0;
	int pontosTime1 = 0;
	int pontosTime2 = 0;
	int saldoGolsTime1 = 0;
	int saldoGolsTime2 = 0;
	char time1[100];
	char time2[100];

	for(int i = 0; i < qtdPartidas; i++){
		placar1 = partidas[i].placar1;
		placar2 = partidas[i].placar2;
		strcpy(time1,partidas[i].time1);
		trataPais(time1);	//verifica se o nome do time deve ser substituido
		strcpy(time2,partidas[i].time2);
		trataPais(time2);	//verirfica se o nome do time deve ser substituido
		saldoGolsTime1 = placar1 - placar2;
		saldoGolsTime2 = placar2 - placar1;

		if(placar1==placar2){
			vitoriaTime1 = 0;
                    	vitoriaTime2 = 0;
                    	empateTime1 = 1;
                    	empateTime2 = 1;
                    	derrotaTime1 = 0;
                    	derrotaTime2 = 0;
                   	pontosTime1 = 1;
                    	pontosTime2 = 1;

		}//fim if
		else if(placar1 > placar2){
			vitoriaTime1 = 1;
                   	vitoriaTime2 = 0;
                   	empateTime1 = 0;
                    	empateTime2 = 0;
                    	derrotaTime1 = 0;
                    	derrotaTime2 = 1;
                    	pontosTime1 = 3;
                    	pontosTime2 = 0;
		}//fim else if
		else{
			vitoriaTime1 = 0;
                    	vitoriaTime2 = 1;
                    	empateTime1 = 0;
                    	empateTime2 = 0;
                    	derrotaTime1 = 1;
                    	derrotaTime2 = 0;
                    	pontosTime1 = 0;
                    	pontosTime2 = 3;
		}//fim else

		posTime1 = retornaPosicao(time1,times);//retorna a posicao do time no array
		posTime2 = retornaPosicao(time2,times);//caso nao exista retorna -1
		
		if(posTime1 == -1){	//cria um time1 caso nao exista
			strcpy(times[qtdTimes].pais,time1);
			times[qtdTimes].golsPro = placar1; 
			times[qtdTimes].golsContra = placar2; 
			times[qtdTimes].saldoGols = saldoGolsTime1; 
			times[qtdTimes].vitorias = vitoriaTime1; 
			times[qtdTimes].derrotas = derrotaTime1; 
			times[qtdTimes].empates = empateTime1; 
			times[qtdTimes].jogos = 1; 
			times[qtdTimes].numPontos = pontosTime1;
			qtdTimes++;
		}//fim if
		else{	//adiciona valores caso o time1 exista
			times[posTime1].golsPro = times[posTime1].golsPro + placar1;
			times[posTime1].golsContra = times[posTime1].golsContra + placar2;
			times[posTime1].vitorias = times[posTime1].vitorias + vitoriaTime1;
			times[posTime1].derrotas = times[posTime1].derrotas + derrotaTime1;
			times[posTime1].empates = times[posTime1].empates + empateTime1;
			times[posTime1].numPontos = times[posTime1].numPontos + pontosTime1;
			times[posTime1].saldoGols = times[posTime1].saldoGols + saldoGolsTime1;
			times[posTime1].jogos = times[posTime1].jogos + 1;
		}//fim else

		if(posTime2 == -1){	//cria um time2 caso nao exista
			strcpy(times[qtdTimes].pais,time2);
			times[qtdTimes].golsPro = placar2;
			times[qtdTimes].golsContra = placar1;
			times[qtdTimes].saldoGols = saldoGolsTime2;
			times[qtdTimes].vitorias = vitoriaTime2;
			times[qtdTimes].derrotas = derrotaTime2;
			times[qtdTimes].empates = empateTime2;
			times[qtdTimes].jogos =  1;
			times[qtdTimes].numPontos = pontosTime2;
			qtdTimes++;
		}//fim if
		else{	//adiciona valores caso o time2 exista
			times[posTime2].golsPro = times[posTime2].golsPro + placar2;
			times[posTime2].golsContra = times[posTime2].golsContra + placar1;
			times[posTime2].vitorias = times[posTime2].vitorias += vitoriaTime2;
                        times[posTime2].derrotas = times[posTime2].derrotas += derrotaTime2;
                        times[posTime2].empates = times[posTime2].empates + empateTime2;
                        times[posTime2].numPontos = times[posTime2].numPontos + pontosTime2;
                        times[posTime2].saldoGols = times[posTime2].saldoGols + saldoGolsTime2;
                        times[posTime2].jogos = times[posTime2].jogos + 1;
		}//fim else	
	}//fim for
}//fim criaTimes()

/*
*Retorna o tamanho do pais de menor nome
*@param CelulaDupla i, posicao do Time1
*@param CelulaDupla j, posicao do Time2
*@return int menorTam, tamanho do pais de menor nome
*/
int getMenorPais(CelulaDupla* i, CelulaDupla* j){
	int menorTam = strlen(i->elemento.pais);

	if(strlen(j->elemento.pais) < menorTam){
		menorTam = strlen(j->elemento.pais);
	}//fim if

	return menorTam;
}//fim getMenorPais()

/*
*Pega a posicao do primeiro char diferente entre duas Strings
*@param CelulaDupla i, posicao do Time1
*@param CelulaDupla j, posicao do Time2
*@return int posCHarDif, posicao do primeiro char diferente entre os dois times
*/
int pegaCharDif(CelulaDupla* i, CelulaDupla* j){
	int posCharDif = 0;
        int menorTam = getMenorPais(i, j);

        for(int cont = 0; cont < menorTam; cont++){ //pega a primeira posicao em que o char eh diferente
        	if(i->elemento.pais[cont] == j->elemento.pais[cont]){
                        posCharDif++;
                }//fim if
		else { 
			cont = menorTam; 
		}//fim else
        }//fim for

	if(posCharDif == menorTam) posCharDif = -1;

	return posCharDif;
}//fim pegaChardif()

/*
*Faz ordenacao alfabetica na Lista
*/
void ordenaAlfabetico(){
	int posCharDif;

	for (CelulaDupla* i = ultimo; i != primeiro; i = i->ant) {
         	for (CelulaDupla* j = primeiro; j != ultimo; j = j->prox) {
			posCharDif = pegaCharDif(j, j->prox);

			if(j->elemento.golsPro == j->prox->elemento.golsPro){
                                if(posCharDif < 0){
                                        if(strlen(j->elemento.pais) > strlen(j->prox->elemento.pais)) swap(j, j->prox);
                                }//fim if
                                else if(j->prox->elemento.pais[posCharDif] == 'A' && j->elemento.pais[posCharDif] == 'Á'){
                                        swap(j,j->prox);
                                }//fim else if
                                else if((j->prox->elemento.pais[0] != 'Á') && (j->elemento.pais[posCharDif] > j->prox->elemento.pais[posCharDif])) {
                                        swap(j,j->prox);
                                }//fim else if
                        }//fim if
         	}//fim for(j)
	}//fim for(i)
}//fim ordenaAlfabetico()

/**
*Escreve os dados de teste do programa em um txt
*@param double tempo, tempo para o programa ordenar
*/
void escreveDados(double tempo){
	FILE *arq;

	arq = fopen("605286_quicksort.txt","wt");

	if(arq == NULL){
		printf("ERRO ao criar arquivo");
	}//fim if
	else{
		fprintf(arq,"605286\tTempo de execução: %f s.\tQuantidade de comparações: %d",tempo,comparacoes);
	}//fim else
	
	fclose(arq);
}//fim escreveDados()

int main(int argc, char** argv){
	start();
	srand(time(NULL));
	int copas[1000];
	int qtdCopas = leEntrada(copas); //Le as copas e conta sua qtd
	Partida partidas[1000];
	Time times[500];

	for(int i = 0; i < qtdCopas; i++){
		ler(copas[i],partidas);
	}//fim  for

	criaTimes(partidas,times);

	for(int i = 0; i < qtdTimes; i++){
		inserirFim(times[i]);
	}//fim for

	clock_t comeco = clock();

	quicksort();
	ordenaAlfabetico();
	mostrar();

	clock_t fim = clock();
	double total = (clock() - comeco) / (double)CLOCKS_PER_SEC;
	escreveDados(total);
}//fim main()
