/**********************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 15/02/2018
*Nome do programa: TP01Q13
*Objetivo: Refazer a questao 3(Ciframento de Cesar) de forma recursiva
**********************************************************************/

class TP01Q13{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntrada = leEntrada(entrada);
		String resultado = "";

		for(int i = 0; i < qtdEntrada; i++){
			resultado = ciframento(entrada[i],0);
			MyIO.println(resultado);
		}//fim for
	}//fim main()

	/**********************************************************************
	*Metodo: leEntrada()
	*Entrada: Um array de Strings
	*Saida: Um valor inteiro referente a quantidade de entradas
	***********************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdEntrada = 0;

		do{
			entrada[qtdEntrada] = MyIO.readLine();
		}while(entrada[qtdEntrada++].equals("FIM") == false);
		qtdEntrada--; //Ignora a entrada "FIM"

		return qtdEntrada;
	}//fim leEntrada()
	
	/**********************************************************************
	*Metodo: ciframento()
	*Entrada: Uma String e um valor inteiro de controle i
	*Saida: A String apos sofrer ciframento de cesar(chave 3)
	***********************************************************************/
	public static String ciframento(String s, int i){
		String cifrado = "";
		
		if(i < s.length()){
			cifrado = cifrado + (char)(s.charAt(i) + 3); //cifrado assume o valor da char 3 casas a frente da char presente na posicao i
			cifrado = cifrado + ciframento(s, (i+1));
			
		}//fim if

		return cifrado;
	}//fim ciframentoDeCesar()
	
}//fim TP01Q13
