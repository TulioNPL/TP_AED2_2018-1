/******************************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 11/02/2018
*Nome do Programa: TP01Q06
*Objetivo: Criar um programa que verifica se a String eh composta apenas por consoantes ou vogais
* ou se eh um numero inteiro ou real.
******************************************************************************************/

class TP01Q06{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntradas = leEntrada(entrada);

		saida(entrada, qtdEntradas);
	}//fim main()

	/************************************************************
	*Metodo: saida()
	*Entrada: Um array de Strings e a quantidade de entradas
	*Saida: Nenhuma
	*************************************************************/

	public static void saida(String[] entrada, int qtdEntradas){
		
		for(int i = 0; i < qtdEntradas; i++){
			if(apenasVogais(entrada[i])){
				MyIO.print("SIM ");
			}//fim if
			else{
				MyIO.print("NAO ");
			}//fim else

			if(apenasConsoantes(entrada[i])){
				MyIO.print("SIM ");
			}//fim if
			else{
				MyIO.print("NAO ");
			}//fim else

			if(isInt(entrada[i])){
				MyIO.print("SIM ");
			}//fim if
			else{
				MyIO.print("NAO ");
			}//fim else

			if(isDouble(entrada[i])){
				MyIO.println("SIM");
			}//fim if
			else{
				MyIO.println("NAO");
			}//fim else                          
		}//fim for
	}//fim saida()

	/************************************************************
        *Metodo: apenasVogais()
        *Entrada: Uma string
        *Saida: Um valor booleano que define se a string possui apenas vogais
        *************************************************************/

	public static boolean apenasVogais(String s){
		int tam = s.length();
		boolean apenasVogais = true;
		boolean ehVogal;
		char aux;

		for(int i = 0; i < tam; i++){
			aux = s.charAt(i);
			ehVogal = aux =='a' ||aux=='e' ||aux=='i' ||aux=='o' ||aux=='u' ||aux=='A' ||aux=='E' ||aux=='I' ||aux=='O' ||aux =='U';

			if((aux < 'A' || (aux > 'Z' && aux < 'a') || aux > 'z') || !ehVogal){ //confere se eh letra e se nao eh vogal
				apenasVogais = false;
			}//fim if
		}//fim for

		return apenasVogais;
	}//fim apenasVogais()

	/************************************************************
        *Metodo: apenasConsoantes()
        *Entrada: Uma String
        *Saida: Um valor booleano que verifica se a String possui apenas consoantes
        *************************************************************/

	public static boolean apenasConsoantes(String s){
		int tam = s.length();
		boolean apenasConsoantes = true;
		boolean ehVogal;
		char aux;

		for(int i = 0; i < tam; i++){
			aux = s.charAt(i);
			ehVogal = aux =='a' ||aux=='e' ||aux=='i' ||aux=='o' ||aux=='u' ||aux=='A' ||aux=='E' ||aux=='I' ||aux=='O' ||aux =='U';

			if((aux < 'A' || (aux > 'Z' && aux < 'a') || aux > 'z') || ehVogal){ //confere se eh letra e se eh vogal
				apenasConsoantes = false;
			}//fim if
		}//fim for
		
		return apenasConsoantes;
	}//fim apenasConsoantes();

	/************************************************************
        *Metodo: isInt()
        *Entrada: Uma String
        *Saida: Um valor booleano que define se a String pode ser um numero inteiro
        *************************************************************/

	public static boolean isInt(String s){
		boolean isInt = true;
		int tam = s.length();

		for(int i = 0; i < tam; i++){
			if(i == 0 && s.charAt(i) == '-'){ //confere se o primeiro char eh '-'
				i++;//pula para a proxima posicao
				if(s.charAt(i) < '0' || s.charAt(i) > '9'){
					isInt = false;
				}//fim if
			}//fim if
			else{
			if(s.charAt(i) < '0' || s.charAt(i) > '9'){
					isInt = false;
				}//fim if
			}//fim else
		}//fim for

		return isInt;
	}//fim isInt()

	/************************************************************
        *Metodo: isDouble()
        *Entrada: Uma String
        *Saida: Um valor booleano que define se a String pode ser um numero real
        *************************************************************/

	public static boolean isDouble(String s){
		boolean isDouble = true;
		int qtdPontuacao = 0;
		int tam = s.length();

                for(int i = 0; i < tam; i++){
			if(s.charAt(i) == '.' || s.charAt(i) == ','){ // confere se o char eh um '.' ou ','
				qtdPontuacao++;
			}//fim if

                        if(i == 0 && s.charAt(i) == '-'){     //confere se o primeiro char eh '-'
                                i++;                          //pula para a proxima posicao
                                if((s.charAt(i) < '0' || s.charAt(i) > '9')&&(s.charAt(i) != ',')&&(s.charAt(i) != '.')){ //confere se eh num ou pontuacao
                                        isDouble = false;					
                                }//fim if
                        }//fim if
                        else{
                                if((s.charAt(i) < '0' || s.charAt(i) > '9') && (s.charAt(i) != '.') && (s.charAt(i) != ',')){
                                        isDouble = false;
                                }//fim if
                        }//fim else
                }//fim for
	
		if(qtdPontuacao > 1){ //confere se existe nao mais que um '.' ou ',' na String
			isDouble = false;
		}//fim if	
	
		return isDouble;
	}//fim isDouble()

	/************************************************************
        *Metodo: leEntrada()
        *Entrada: Um array de strings
        *Saida: Um valor inteiro referente a quantidade de entradas digitadas
        *************************************************************/

	public static int leEntrada(String[] entrada){
		int qtdEntradas = 0;

		do{
			entrada[qtdEntradas] = MyIO.readLine();
		}while(entrada[qtdEntradas++].equals("FIM") == false);
		qtdEntradas--; // desconsidera a ultima entrada
		
		return qtdEntradas;
	}//fim leEntrada()
}//fim TP01Q06
