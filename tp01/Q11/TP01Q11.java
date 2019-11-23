/**********************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 15/02/2018
*Nome do programa:
*Objetivo: Refazer a questao "Aquecimento" de forma recursiva
**********************************************************************************/

class TP01Q11{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntrada = leEntrada(entrada);

		for(int i = 0; i < qtdEntrada; i++){
			MyIO.println(qtdMaiusculas(entrada[i],0)); 
		}//fim for
	}//fim main()

	/*********************************************************************
	*Metodo: qtdMaiusculas()
	*Entrada: Uma string e um valor inteiro de controle i
	*Saida: A quantidade de letras maiusculas em uma String
	***********************************************************************/
	public static int qtdMaiusculas(String s, int i){
		int qtdMaiusculas = 0;

		if(i < s.length()){
			qtdMaiusculas = qtdMaiusculas + qtdMaiusculas(s, (i+1));	
			
			if('A' <= s.charAt(i) && s.charAt(i) <= 'Z'){
				qtdMaiusculas++;
			}//fim if
		}//fim if
		

		return qtdMaiusculas;
	}//fim qtdMaiusculas()

	/*******************************************************************************
	*Metodo: leEntrada()
	*Entrada: Um array de Strings
	*Saida: Um numero inteiro referente a quantidade de entradas
	*********************************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdEntrada = 0;

		do{
			entrada[qtdEntrada] = MyIO.readLine();
		}while(entrada[qtdEntrada++].equals("FIM") == false);
		qtdEntrada--; //Ignora a entrada "FIM"

		return qtdEntrada;
	}//fim leEntrada()
}//fim TP01Q11
