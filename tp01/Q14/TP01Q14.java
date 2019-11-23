/*****************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 16/02/2018
*Nome do programa: TP01Q14
*Objetivo: Refazer a questao 4 (Alteracao aleatoria) de forma recursiva
******************************************************************************/

import java.util.Random;

class TP01Q14{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntrada = leEntrada(entrada);
		String resultado = "";
		Random gerador = new Random();
		gerador.setSeed(4);
		char sorteiaUm,
		     sorteiaDois;

		for(int i = 0; i < qtdEntrada; i++){
			sorteiaUm = ((char)('a' + Math.abs(gerador.nextInt()) % 26));
			sorteiaDois = ((char)('a' + Math.abs(gerador.nextInt()) %26));
			resultado = trocaLetras(entrada[i], 0, sorteiaUm, sorteiaDois);			
			MyIO.println(resultado);
		}//fim for
	}//fim main()

	/****************************************************************************************
	*Metodo: leEntrada()
	*Entrada: Um array de Strings
	*Saida: Um valor inteiro referente a quantidade de entradas
	*****************************************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdEntrada = 0;

		do{
			entrada[qtdEntrada] = MyIO.readLine();
		}while(entrada[qtdEntrada++].equals("FIM") == false);
		qtdEntrada--; //Ignora a entrada "FIM"

		return qtdEntrada;
	}//FIM leEntrada()

	/****************************************************************************************
	*Metodo: trocaLetras()
	*Entrada: Uma String, um valor inteiro de controle, e duas char sorteadas
	*Saida: A String apos ter sofrido a troca de letras
	***************************************************************************************/
	public static String trocaLetras(String s, int i, char sorteiaUm, char sorteiaDois){
		String resultado = "";

		if(i < s.length()){	//condicao de parada
			if(s.charAt(i) == sorteiaUm){	//caso o char na posicao i seja igual sorteiaUm, ele sera substituido
				resultado = resultado + sorteiaDois;
			}//fim if
			else{
				resultado = resultado + s.charAt(i);
			}//fim else
			resultado = resultado + trocaLetras(s,(i+1),sorteiaUm,sorteiaDois);
		}//fim if			

		return resultado;
	}//fim alteracaoAleatoria()
}//fim TP01Q14
