/********************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 15/02/2018
*Nome do programa: TP01Q12
*Objetivo: Refazer a questao 2(Palindromo) Utilizando recursividade
********************************************************************************/

class TP01Q12{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntradas = leEntrada(entrada);
		
		for(int i = 0; i < qtdEntradas; i++){
			if(ehPalindromo(entrada[i], 0)){
				MyIO.println("SIM");
			}//fim if
			else{	
				MyIO.println("NAO");
			}//fim else
		}//fim for
	}//fim main()
	
	/**********************************************************************
	*Metodo: leEntrada()
	*Entrada: Um array de Strings
	*Saida: Um numero inteiro referente a quantidade de entradas
	************************************************************************/	
	public static int leEntrada(String[] entrada){
		int qtdEntrada = 0;

		do{
			entrada[qtdEntrada] = MyIO.readLine();
		}while(entrada[qtdEntrada++].equals("FIM") == false);
		qtdEntrada--; //Ignora a entrada "FIM"

		return qtdEntrada;
	}//fim leEntrada()
	
	/***********************************************************************
	*Metodo: ehPalindromo()
	*Entrada: Uma string e uma variavel inteira de controle
	*Saida: Um valor booleano que define se a String eh ou nao palindromo
	*************************************************************************/
	public static boolean ehPalindromo(String s, int i){
		boolean ehPalindromo = true;

		if(i < s.length()/2){
			ehPalindromo = ehPalindromo(s, (i+1));
			if(s.charAt(i) != s.charAt(s.length()-1-i)){ //-1 sincroniza com as posicoes corretas do array
				ehPalindromo = false;
			}//fim if
		}//fim if

		return ehPalindromo;
	}//fim ehPalindromo()
}//fim TP01Q12
