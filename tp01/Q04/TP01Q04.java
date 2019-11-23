/*****************************************************************
* Autor: Tulio N. Polido Lopes
* Data: 10/02/2018
* Nome do Programa: TP01Q04
* Objetivo: Criar um programa que faca uma substituicao de letras
*****************************************************************/
import java.util.Random;
class TP01Q04{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntradas = leEntrada(entrada);


		trocaLetras(entrada, qtdEntradas);
	}//fim main()

	/************************************************************************
	*Metodo: leEntrada()
	*Entrada: Um arranjo de Strings
	*Saida: Um valor inteiro referente a quantidade de entradas
	*************************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdEntradas = 0;
		do{
			entrada[qtdEntradas] = MyIO.readLine();
		}while(entrada[qtdEntradas++].equals("FIM") == false);
		qtdEntradas--; //desconsidera a entrada "FIM"
		
		return qtdEntradas;
	}//fim leEntrada()

	/*************************************************************************
	*Metodo: trocaLetras()
	*Entrada: Um arranjo de Strings e a quantidade de entradas do usuario
	*Saida: Nenhuma
	**************************************************************************/
	public static void trocaLetras(String[] entrada, int qtdEntradas){
		Random gerador = new Random();
		gerador.setSeed(4);
		int tam;
		char sorteiaUm,
		     sorteiaDois;
		String aux = "",
		       saida;
		
		for(int i = 0; i < qtdEntradas; i++){
			saida = "";//Apaga os valores anteriores para a String saida
			aux = entrada[i];
			sorteiaUm = ((char)('a' + Math.abs(gerador.nextInt()) % 26));
			sorteiaDois = ((char)('a' + Math.abs(gerador.nextInt()) % 26));
			tam = aux.length();

			for(int j = 0; j < tam; j++){
				if(aux.charAt(j) >= 'a' && aux.charAt(j) <= 'z'){	//garante que a letra seja minuscula para sofrer troca
					if(aux.charAt(j) == sorteiaUm){
						saida = saida + sorteiaDois;
					}//fim if
					else{
						saida = saida + aux.charAt(j);
					}//fim else
				}//fim if
				else{
					saida = saida + aux.charAt(j);
				}//fim else
			}//fim for(j)

			MyIO.println(saida);
		}//fim for(i)
	}//fim trocaLetras()
}//fim TP01Q04
