/**********************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 12/02/2018
*Nome do programa: TP01Q07
*Objetivo: Criar um programa que reconheca palindromos em C
***********************************************************************************/

#include <stdio.h>
#include <string.h>
/**********************************************************************************
*Metodo: isPalindromo()
*Entrada: Uma string
*Saida: Um valor inteiro que age como boolean
**********************************************************************************/
int isPalindromo(char string[500]){
	int i = 0;
	int boolean = 0;
	int tam = strlen(string)-1; //-1 exclui o caractere '\0'
	
	while(i < tam &&string[i] == string[tam-1]){
		i++;
		tam--;
	}//fim while

	if(i >= tam){
		boolean = 1;
	}//fim if	

	return boolean;
}//fim isPalindromo() 

/**********************************************************************************
*Metodo: leEntrada()
*Entrada: Um vetor de strings
*Saida: Um valor inteiro que calcula a quantidade de entradas
**********************************************************************************/
int leEntrada(char entrada[1000][500]){
        int qtdEntradas = 0;

        do{
                fgets(entrada[qtdEntradas], sizeof entrada[qtdEntradas], stdin);
        }while(strcmp(entrada[qtdEntradas++], "FIM\n") != 0);
        qtdEntradas --;	//desconsidera a entrada "FIM"

        return qtdEntradas;
}//fim leEntrada()

int main(){
	char entrada[1000][500];
	int qtdEntradas = leEntrada(entrada);
	int i;
	int boolean;
	
	for(i=0; i<qtdEntradas; i++){
		boolean = isPalindromo(entrada[i]);
		if(boolean == 1){
			printf("SIM\n");
		}//fim if
		else{
			printf("NAO\n");
		}//fim else
	}//fim for 

	return 0;
}//fim main()
