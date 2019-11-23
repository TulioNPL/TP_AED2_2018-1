/*******************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 09/02/2018
*Nome do programa: TP01Q02
*Objetivo: Verificar se uma série de palavras são ou não palíndromos
********************************************************************/

class TP01Q02{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntradas = leEntrada(entrada);
		
		for(int i=0; i<qtdEntradas;i++){
			if(isPalindromo(entrada[i])){
				MyIO.println("SIM");
			}//fim if
			else{
				MyIO.println("NAO");
			}//fim else
		}//fim for
	}//fim main()

	/******************************************************************
	*Metodo: isPalindromo()
	*Entrada: Uma String
	*Saida: Um valor booleano que define se a string é o não palindromo
	*******************************************************************/
	public static boolean isPalindromo(String s){
		boolean isPalindromo = true;
		int tam = s.length();

		for(int i=0; i < tam/2; i++){
			if(s.charAt(i) != s.charAt(tam-1-i)){//-1 sincroniza com as posicoes do array
				isPalindromo = false;
			}//fim if
		}//fim for 
		
		return isPalindromo;
	}//fim isPalindromo()

	/*********************************************************************
	*Metodo: leEntrada()
	*Entrada: Um arranjo de strings
	*Saida: Um valor inteiro referente ao numero de strings da entrada
	**********************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdEntradas = 0;
		
		do{
			entrada[qtdEntradas] = MyIO.readLine();
		}while(entrada[qtdEntradas++].equals("FIM") == false); 
		qtdEntradas--;//desconsiderar ultima entrada

		return qtdEntradas;
	}//fim leEntradas()
}//fim TP01Q02
