/*****************************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 10/02/2018
*Nome do Programa: TP01Q05
*Objetivo: Criar um programa que faca analise de algebra booleana
******************************************************************************************/

import java.lang.*;

class TP01Q05{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntradas = leEntradas(entrada);
		
		for(int i = 0; i < qtdEntradas; i++){
			analiseBooleana(entrada[i]);
		}//fim for
	}//fim main()

	/********************************************************************************
	*Metodo:leEntradas()
	*Entrada:Um array de Strings
	*Saida:Um valor inteiro referente ao numero de entradas
	*********************************************************************************/
	public static int leEntradas(String[] entrada){
		int qtdEntradas = 0;

		do{
			entrada[qtdEntradas] = MyIO.readLine();
		}while(entrada[qtdEntradas++].equals("0") == false);
		qtdEntradas--;// desconsidera a ultima entrada

		return qtdEntradas;
	}//fim leEntradas()	
	
	/********************************************************************************
	*Metodo: analiseBooleana()
	*Entrada: Um array de strings
	*Saida: Nenhuma
	********************************************************************************/
	public static void analiseBooleana(String entrada){
		int n;
		char aux;
		int qtdEspaco = 0;		
		String frase = "";
	
		for(int i = 0; i < entrada.length(); i++){
			if(entrada.charAt(i) == ' ') qtdEspaco++;	//conta a quantidade de espacos
		}//fim for		

		String array[] = new String[qtdEspaco];
		array = entrada.split(" ");		//separa a String sempre que houver " "

		aux = array[0].charAt(0);
		n = Character.getNumericValue(aux);
	
		int[] num = new int[n];

		for(int i = 0; i < n; i++){
			num[i] = Character.getNumericValue(array[i+1].charAt(0));			
		}//fim for

		for(int i = n+1; i < array.length; i++){
			frase += array[i];
		}//fim for
		
		frase = trocaSimbolos(frase,num);
		MyIO.println(frase);
		frase = substituiVirgula(frase);	
		MyIO.println(frase+"\n");
	}//fim pegaValores()	

	/******************************************************************************
	*Metodo: trocaSimbolos()
	*Entrada: Uma String e um array com os valores booleanos lidos
	*Saida: Uma String que sofreu troca de Simbolos;
	******************************************************************************/
	public static String trocaSimbolos(String frase, int[] num){
		String fraseFinal = "";
		
		for(int i = 0; i < frase.length(); i++){	
			switch(frase.charAt(i)){
				case 'a':
					fraseFinal = fraseFinal + "&&";
					i+=2;
					break;
				case 'n':
					fraseFinal = fraseFinal + "!";
					i+=2;
					break;
				case 'o':
					fraseFinal = fraseFinal + "||";
					i+=1;
					break;
				case 'A':
					fraseFinal = fraseFinal + num[0];
					break;
				case 'B':
					fraseFinal = fraseFinal + num[1];
					break;
				case 'C':
					fraseFinal = fraseFinal + num[2];
					break;
				case 'D':
					fraseFinal = fraseFinal + num[3];
					break;
				case 'E':
					fraseFinal = fraseFinal + num[4];
					break;
				default:
					fraseFinal = fraseFinal + frase.charAt(i);
			}//fim switch
		}//fim for
		
		return fraseFinal;
	}//fim trocaSimbolos()
	
	/********************************************************************************************
	*Metodo: substituiVirgula()
	*Entrada: Uma String
	*Saida: A mesma String apos sofrer a substituicao das virgulas pelos respectivos simbolos
	********************************************************************************************/
	public static String substituiVirgula(String frase){
		String fraseFinal = "";
		char[] aux = new char[20];
		int num = 0;

		for(int i = 0; i < frase.length(); i++){
			if(frase.charAt(i) == '&' || frase.charAt(i) == '|'){
				aux[num++] = frase.charAt(i);
				i+=2;
			}//fim if	
		}//fim for
		
		for(int i = 0; i < num; i++){
			MyIO.print(aux[i]);
		}//fim if
			MyIO.print("\n");

		int controle = -1;

		for(int i = 0; i < frase.length(); i++){
			if(frase.charAt(i) == '(') controle++;
			else if(frase.charAt(i) == ')') controle--;
							
			if(frase.charAt(i) == '&' || frase.charAt(i) == '|'){
				i++;
			}//fim if
			else if(frase.charAt(i) == ','){
				fraseFinal = fraseFinal + aux[controle] + aux[controle];
			}//fim if
			else{
				fraseFinal = fraseFinal + frase.charAt(i);
			}//fim else	
		}//fim for
	
		return fraseFinal;
	}//fim substituiVirgula()
}//fim TP01Q05

