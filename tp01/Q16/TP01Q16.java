/********************************************************************
*Autor:Tulio N. Polido Lopes
*Data: 16/02/2018
*Nome do programa: TP01Q16
*Objetivo: Refazer a questao 6(Is) de forma recursiva
********************************************************************/

class TP01Q16{
	public static void main(String[] args){
		String[] entrada = new String[1000];
		int qtdEntrada = leEntrada(entrada);

		for(int i = 0; i < qtdEntrada; i++){
			if(somenteVogais(entrada[i],0)){
				MyIO.print("SIM ");
			}//fim if somenteVogais()
			else{
				MyIO.print("NAO ");
			}//fim else somenteVogais()

			if(somenteConsoantes(entrada[i],0)){
				MyIO.print("SIM ");
			}//fim if somenteConsoantes()
			else{
				MyIO.print("NAO ");
			}//fim else somenteConsoantes()

			if(isInt(entrada[i],0)){
				MyIO.print("SIM ");
			}//fim if isInt()
			else{
				MyIO.print("NAO ");
			}//fim else isInt()

			if(isDouble(entrada[i],0,0)){
				MyIO.print("SIM\n");
			}//fim if isDouble
			else{
				MyIO.print("NAO\n");
			}//fim else isDouble 
		}//fim for
	}//fim main()

	/**********************************************************************************
	*Metodo: leEntrada()
	*Entrada: Um array de strings
	*Saida: Um valor inteiro referente a quantidade de entradas
	***********************************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdEntrada = 0;
	
		do{
			entrada[qtdEntrada] = MyIO.readLine();
		}while(entrada[qtdEntrada++].equals("FIM") == false);
		qtdEntrada--;	//Ignora a entrada "FIM"

		return qtdEntrada;
	}//fim leEntrada()
	
	/**********************************************************************************
        *Metodo: somenteVogais()
        *Entrada: Uma string e um valor inteiro de controle
        *Saida: Um valor booleano que deifne se a String possui apenas vogais
        ***********************************************************************************/
	public static boolean somenteVogais(String s, int i){
		boolean somenteVogais = true;
		char aux;
		boolean ehVogal;

		if(i < s.length()){	//condicao de parada
			aux = s.charAt(i);
			ehVogal = aux=='a' ||aux=='A' ||aux=='e' ||aux=='E' ||aux=='i' 
				||aux=='I' ||aux=='o' ||aux=='O' ||aux=='u' || aux == 'U';
			somenteVogais = somenteVogais(s, (i+1));
			
			if(!ehVogal){	//confere se nao eh vogal
				somenteVogais = false;
			}//fim if
		}//fim if

		return somenteVogais;
	}//fim somenteVogais()

	/**********************************************************************************
        *Metodo: somenteConsoantes()
        *Entrada: Uma string e um valor inteiro de controle
        *Saida: Um valor booleano que define se a String possui apenas consoantes
        ***********************************************************************************/
	public static boolean somenteConsoantes(String s, int i){
		boolean somenteConsoantes = true;
		char aux;
		boolean ehVogal;

		if(i < s.length()){	//condicao de parada
			aux = s.charAt(i);
			somenteConsoantes = somenteConsoantes(s,(i+1));
			ehVogal = aux=='a' ||aux=='A' ||aux=='e' ||aux=='E' ||aux=='i' 
				||aux=='I' ||aux=='o' ||aux=='O' ||aux=='u' || aux == 'U';

			if((aux < 'A' || (aux > 'Z' && aux < 'a') || aux > 'z') || ehVogal){	//confere se eh letra e se eh vogal
				somenteConsoantes = false;
			}//fim if
		}//fim if

		return somenteConsoantes;
	}//fim somenteConsoantes()
	
	/**********************************************************************************
        *Metodo: isInt()
        *Entrada: Uma string e um valor inteiro de controle
        *Saida: Um valor booleano que define se a String pode ou nao ser um numero inteiro
        ***********************************************************************************/
	public static boolean isInt(String s, int i){
		boolean isInt = true;
		char aux;

		if(i < s.length()){	//condicao de parada
			aux = s.charAt(i);
			isInt = isInt(s,(i+1));

			if(i == 0){	//confere se a posicao do char eh '0'
				if(aux != '-' && (aux < '0' || aux > '9')){//confere se o primeiro caractere eh '-' ou um num
					isInt = false;
				}//fim if
			}//fim if
			else{
				if(aux < '0' || aux > '9'){	//confere se os demais caracteres sao algarismos
					isInt = false;
				}//fim if
			}//fim else
		}//fim if

		return isInt;
	}//fim isInt()

	/**********************************************************************************
        *Metodo: isDouble()
        *Entrada: Uma string, um valor inteiro de controle, e um valor inteiro que representa a quantidade pontos
        *Saida: Um valor booleano que define se a String pode ou nao ser um numero real
        ***********************************************************************************/
	public static boolean isDouble(String s, int i, int qtdPontuacao){
		boolean isDouble = true;
		char aux;

		if(i < s.length()){	//condicao de parada
			aux = s.charAt(i);

			if(i == 0){	//confere se a posicao do char eh '0'
				if(aux != '-' && aux != ',' && aux != '.' && (aux < '0' || aux > '9')){
					isDouble = false;
				}//fim if 
			}//fim if
			else{
				if((aux < '0' || aux > '9') && aux != '.' && aux != ','){	//confere se o char eh num ou se eh '.' ou ','
					isDouble = false;
				}//fim if

				if(aux == '.' || aux == ','){	//se o char for '.' ou ',' aumenta o contador de pontuacao
					qtdPontuacao++;
				}//fim if

				isDouble = isDouble(s,(i+1),qtdPontuacao);
			}//fim else
		}//fim if
		
		if(qtdPontuacao > 1){	//confere se ha mais de uma ponto ou virgula
			isDouble = false;
		}//fim if
		
		return isDouble;
	}//fim isDouble()	

}//fim TP01Q16
