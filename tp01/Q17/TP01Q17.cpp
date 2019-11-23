/*************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 16/02/2018
*Nome do programa: TP01Q17
*Objetivo: Refazer a questao 7(Palindromo em C) de forma recursiva
*************************************************************************/
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

/*************************************************************************
*Metodo: leEntrada()
*Entrada: Um array de Strings
*Saida: Um valor inteiro referente a quantidade de entradas
**************************************************************************/
int leEntrada(char entrada[1000][500]){
	int qtdEntrada = 0;

	do{
		fgets(entrada[qtdEntrada], sizeof entrada[qtdEntrada], stdin);
	}while(strcmp(entrada[qtdEntrada++],"FIM\n") != 0);
	qtdEntrada--;	//Ignora a entrada "FIM"

	return qtdEntrada;
}//fim leEntrada()

/***************************************************************************
*Metodo: isPalindromo()
*Entrada: Uma string e um valor inteiro de controle
*Saida: Um valor inteiro que define se a string eh ou nao palindromo
****************************************************************************/
int isPalindromo(char string[500], int i){
	int boolean = 1;
	int tamStr = strlen(string)-1;	//-1 exclui o caractere '\0'
	
	if(i < tamStr/2){	
		boolean = isPalindromo(string,(i+1));

		if(string[i] != string[tamStr-1-i]){	//-1 sincroniza com as posicoes do array
			boolean = 0;
		}//fim if
	}//fim if

	return boolean;
}//fim isPalindromo

int main(){
	char entrada[1000][500];
	int qtdEntrada = leEntrada(entrada);
	int i;

	for(i=0; i<qtdEntrada; i++){
		if(isPalindromo(entrada[i],0) == 1){	//'1' funciona como 'true'
			printf("SIM\n");
		}//fim if
		else{
			printf("NAO\n");
		}//fim else
	}//fim for
}//fim main()
