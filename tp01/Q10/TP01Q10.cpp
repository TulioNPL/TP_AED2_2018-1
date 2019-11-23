/****************************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 17/02/2018
*Nome do programa: TP01Q10
*Objetivo: Refazer a questao 09(Arquivo) em C
****************************************************************************************/

#include <stdio.h>

/********************************************************************************
*Metodo: EliminateTrailingFloatZeros()
*Entrada: Um ponteiro para vetor de caracteres
*Saida: Nenhuma
*******************************************************************************/
void eliminateTrailingFloatZeros(char *iValue){
        char *p = 0;
        for(p=iValue; *p; ++p) {
                if('.' == *p) {
                        while(*++p);
                                while('0'==*--p) *p = '\0';
                                        if(*p == '.') *p = '\0';
                                                break;
                }//fim if
        }//fim for
}//fim EliminateTrailingFloatZeros()

/******************************************************************************
*Metodo: gravaDados()
*Entrada: Um inteiro referente a quantidade de numeros lidos e um ponteiro para um arquivo
*Saida: Nenhuma
******************************************************************************/
void gravaDados(int qtdNum, FILE *arq){
	arq = fopen("TP01Q10.txt", "wb");
	float  aux;
	int i;

	if(arq == NULL){	//caso haja problemas para abrir o arquivo
		printf("Arquivo nao encontrado!");
	}//fim if
	else{
		for(i = 0; i < qtdNum; i++){
			scanf("%f", &aux);
			fwrite(&aux,sizeof(float),1,arq);			
		}//fim for
	}//fim else

	fclose(arq);
}//fim gravaDados()

/***************************************************************************
*Metodo: leArquivo()
*Entrada: Um inteiro referente a quantidade de numeros lidos e um ponteiro para um arquivo
*Saida: Nenhuma
***************************************************************************/
void leArquivo(int qtdNum, FILE *arq){
	arq = fopen("TP01Q10.txt", "rb");
	float aux;
	int i;
	

	if(arq == NULL){	//caso haja problemas para abrir o arquivo
		printf("Arquivo nao encontrado!");
	}//fim if
	else{
		for(i = qtdNum-1; i >= 0; i--){		//-1 eh necessario para nao comecar no EOF				
			char resposta[50];	
			fseek(arq, i*(sizeof(float)), SEEK_SET);	
			fread(&aux,sizeof(float),1,arq);
			sprintf(resposta, "%.3f", aux);
			eliminateTrailingFloatZeros(resposta);	
//			printf("%.2f\n", aux);
			printf("%s\n",resposta);
		}//fim for
	}//fim else

	fclose(arq);
}//fim leArquivo()

int main(){
	FILE *arq;
	int qtdNum;
	
	scanf("%d", &qtdNum);

	gravaDados(qtdNum,arq);

	leArquivo(qtdNum,arq);

	return 0;
}//fim main()
