/*************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 09/02/2018
*Nome do programa: TP01Q03
*Objetivo: Criar um programa que encripte frases com ciframento de Cesar
*************************************************************************/
class TP01Q03{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		String saida = "";
		int qtdEntrada = leEntrada(entrada);

		for(int i = 0; i < qtdEntrada; i++){
			saida = ciframento(entrada[i]);
			MyIO.println(saida);
		}//fim for
	
	}//fim main()
	
	/*****************************************************************
	*Metodo: leEntrada()
	*Entrada: Um array de Strings
	*Saida: Um valor inteiro referente a quantidade de Strings
	******************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdEntrada = 0;

		do{
			entrada[qtdEntrada] = MyIO.readLine();
		}while(entrada[qtdEntrada++].equals("FIM") == false);
		qtdEntrada--;//Desconsidera a entrada "FIM"

		return qtdEntrada;
	}//fim leEntrada
	
	/**********************************************************************************************
	*Metodo: Ciframento()
	*Entrada: Dois arrays de string e um valor inteiro referente a quantidade de strings da entrada
	*Saida: Nenhum
	***********************************************************************************************/
	public static String ciframento(String s){
		int tam = s.length();
      		String saida = "";

		for(int i = 0; i < tam; i++){
			saida = saida +(char)(s.charAt(i) + 3);
		}//fim for

		return saida;
	}//fim ciframento()
}//fim TP01Q03
