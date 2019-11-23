/**********************************************************************************************
*Autor: Tulio N. Polido Lopes
*Data: 10/03/2018
*Objetivo: Criar uma Fila de Partidas
***********************************************************************************************/

import java.io.*;
import java.lang.*;

class Partida extends Object implements Cloneable{
	private static int qtdPartidas = 0;
	private int copa,
		    placar1,
		    placar2,
	  	    dia,
		    mes;
	private String etapa,
		       time1,
		       time2,
		       local;
	
	/***********************************************************************************
	*Metodos contrutores
	*Funcao: Criar intancias de Partida
	************************************************************************************/
	Partida(){
		this.copa = 0;
		this.placar1 = 0;
		this.placar2 = 0;
		this.dia = 0;
		this.mes = 0;
		this.etapa = "";
		this.time1 = "";
		this.time2 = "";
		this.local = "";
	}//fim Partida()
	Partida(int copa, int placar1, int placar2, int dia, int mes, String etapa, String time1, String time2, String local){
		this.setCopa(copa);
                this.setPlacar1(placar1);
                this.setPlacar2(placar2);
                this.setDia(dia);
                this.setMes(mes);
                this.setEtapa(etapa);
                this.setTime1(time1);
                this.setTime2(time2);
                this.setLocal(local);
	}//fim Partida()
	
	/******************************************************************************************
	*Metodos: get() e set()
	*Funcao: Pegar ou guardar valores nas variaveis privadas
	******************************************************************************************/
	public static int getQtdPartidas(){
		return qtdPartidas;
	}//fim getQtdPartidas()

	public int getCopa(){
		return this.copa;
	}//fim getCopa()
	public void setCopa(int copa){
		this.copa = copa;
	}//fim setCopa()

	public int getPlacar1(){
		return this.placar1;
        }//fim getPlacar1()
        public void setPlacar1(int placar1){
		this.placar1 = placar1;
        }//fim setPlacar1()
	public  int getPlacar2(){
		return this.placar2;
        }//fim getPlaar2()
        public  void setPlacar2(int placar2){
		this.placar2 = placar2;
        }//fim setPlacar2()
	
	public int getDia(){
		return this.dia;
        }//fim getDia()
        public void setDia(int dia){
		this.dia = dia;
        }//fim setDia()
	
	public int getMes(){
		return this.mes;
        }//fim getMes()
        public void setMes(int mes){
		this.mes = mes;
        }//fim setMes()

	public String getEtapa(){
		return this.etapa;
        }//fim getEtapa()
        public void setEtapa(String etapa){
		this.etapa = etapa;
        }//fim setEtapa()

	public String getTime1(){
		return this.time1;
        }//fim getTime1()
        public void setTime1(String time1){
		this.time1 = time1;
        }//fim setTIme1()
	public String getTime2(){
		return this.time2;
        }//fim getTime2()
        public void setTime2(String time2){
		this.time2 = time2;
        }//fim setTIme2()

	public String getLocal(){
		return this.local;
        }//fim getLocal()
        public void setLocal(String local){
		this.local = local;
        }//fim setLocal()
		
	/***************************************************************************************
	*Metodo: retornaClone()
	*Funcao: clona os valores da partida reccebida para a corrente
	**************************************************************************************/
	public Partida retornaClone() throws Exception {
		return (Partida)this.clone();
	}//fim retornaClone()
	
	/********************************************************************************************
	*Metodo: imprimir() 
	*Funcao: imprimir na tela os dados da partida
	*********************************************************************************************/	
	public void imprimir(){
		MyIO.println("[COPA "+this.copa+"] - "+this.etapa+" - "+this.dia+"/"+this.mes+" - "+this.time1+
			     " ("+this.placar1+") x ("+this.placar2+") "+this.time2+"  - "+this.local);
	}//fim imprimir()

	/**********************************************************************************************
	*Metodo: ler()
	*Funcao: Le o arquivo de uma copa
	**********************************************************************************************/
	public static int ler(String copa, Partida[] partida) throws Exception{
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("/tmp/copa/"+copa+".html"),"ISO-8859-1"));
		boolean ler = false;
		String dadosBrutos = "";
		String linha = br.readLine();
		int qtdPartidas = 0;

		do{
			if(linha.contains("<table cellspacing=\"1\">")){ 
				ler = true;
			}//fim if
			if(ler){
				dadosBrutos = dadosBrutos + linha + "\n";
			}//fim if

			linha = br.readLine();
		}while(linha.contains("<tr bgcolor=\"#000000\"><td colspan=\"5\">&nbsp;</td></tr>") == false);
		br.close();
		
		String pattern = "(?m)^\\s*\\r?\\n|\\r?\\n\\s*(?!.*\\r?\\n)";	//regex para reconhecimento das linhas em branco
		
		dadosBrutos = retiraTags(dadosBrutos);		
		dadosBrutos = dadosBrutos.replaceAll(pattern, "");	//retira as linhas em branco
		
		String dados[] = dadosBrutos.split("\n");	//transforma a String em um array de Strings separando pelo "\n"

		for(int i = 0; i < dados.length; i++){
			dados[i] = dados[i].replaceAll("\\s+"," ");	//retira espacos em branco em excesso
			dados[i] = dados[i].trim();
				
			if(dados[i].contains("/")) qtdPartidas++;
		}//fim for		
			
		criaPartidas(dados,copa,qtdPartidas,partida);

		return qtdPartidas;
	}//fim ler()
	
	/**********************************************************************************************
	*Metodo: criaPartidas()
	*Entrada: Um array de Strings contendo os dados
	*Funcao: Criar as intancias de Partida
	***********************************************************************************************/
	public static void criaPartidas(String[] dados, String copa, int qtd, Partida[] partida){
		boolean ehEtapa;

		int ano = Integer.parseInt(copa),
		    cont = 0,
		    placar1 = 0,
		    placar2 = 0,
		    dia = 0,
		    mes = 0;
		String etapa = "",
		       time1 = "",
		       time2 = "",
		       local = "";

		for(int i = 0; i < qtd; i++){
			ehEtapa = dados[cont].contains("GRUPO") || dados[cont].contains("FINAL") || dados[cont].contains("Disp.");

			if(ehEtapa){
				etapa = dados[cont];
				cont++;
			}//fim if

			int aux = cont;

			do{
				
				if(dados[cont].contains("/")){	//se contem "/" eh uma data
					dia = pegaDia(dados[cont]);
					mes = pegaMes(dados[cont]);
				}//fim if
				else if(dados[cont].contains(" x ")){	//se contem " x " eh placar
					placar1 = pegaPlacar1(dados[cont]);
					placar2 = pegaPlacar2(dados[cont]);
				}//fim else if
				else if(cont == aux+1){	//posicao do time1
					time1 = dados[cont];
				}//fim else if
				else if(cont == aux+3){	//posicao do time2
					time2 = dados[cont];
				}//fim else if
				else if(cont == aux+4){	//posicao do local
					local = dados[cont];
				}//fim else if
				cont++;

			}while((cont < dados.length)&&(dados[cont].contains("/")==false));
			
			ehEtapa = dados[cont-1].contains("GRUPO") || dados[cont-1].contains("FINAL") || dados[cont-1].contains("Disp.");

			if (ehEtapa){	//se a posicao anterios for uma etapa, cont voltara uma posicao.
				cont--;
			}//fim if

			partida[i] = new Partida(ano, placar1, placar2, dia, mes, etapa, time1, time2, local);
			qtdPartidas++;
		}//fim for

	}//fim criaPartidas()
	
	/*************************************************************************************************
        *Metodo: pegaPlacar1()
        *Funcao: Retornar o valor int referente ao placar1
        *************************************************************************************************/
        public static int pegaPlacar1(String s){
                String placar[] = s.split(" x ");
                return Integer.parseInt(placar[0]);
        }//fim pegaDia()

	/*************************************************************************************************
        *Metodo: pegaPlacar2()
        *Funcao: Retornar o valor int referente ao placar2
        *************************************************************************************************/
        public static int pegaPlacar2(String s){
                String placar[] = s.split(" x ");
                return Integer.parseInt(placar[1]);
        }//fim pegaDia()

	/*************************************************************************************************
	*Metodo: pegaDia()
	*Funcao: Retornar o valor int referente ao dia
	*************************************************************************************************/
	public static int pegaDia(String s){
		String data[] = s.split("/");
		return Integer.parseInt(data[0]);
	}//fim pegaDia()

	/*************************************************************************************************
	*Metodo: pegaMes()
	*Funcao: Retornar o valor int referente ao mes
	**************************************************************************************************/
	public static int pegaMes(String s){
                String data[] = s.split("/");
                return Integer.parseInt(data[1]);
	}//fim pegaMes()

	/************************************************************************************************
	*Metodo:retiraEspacos()
	*Funcao: elimina os espacos excessivos em uma string
	*************************************************************************************************/
	public static String retiraEspacos(String s){
		String semEspacos = "";
		boolean ehEspaco = false;

		for(int i = 0; i < s.length(); i++){
			if(s.charAt(i) == ' ') ehEspaco = true;
			else if(s.charAt(i) != ' ') ehEspaco = false;

			if(!ehEspaco){
				semEspacos = semEspacos + s.charAt(i);
			}//fim if
		}//fim for

		return semEspacos;
	}//fim retiraEspacos

	/************************************************************************************************
	*Metodo: retiraTags()
	*Funcao: eliminar as tags da string
	*************************************************************************************************/
	public static String retiraTags(String s){
		String semTags = "";
		boolean isTag = false;

		for(int i = 0; i < s.length(); i++){
			if(s.charAt(i) == '<' || s.charAt(i) == '&') isTag = true;

			if(!isTag){
				semTags += s.charAt(i);
			}//fim if

			if(s.charAt(i) == '>' || s.charAt(i) == ';') isTag = false;
		}//fim for

		return semTags;
	}//fim retiraTags()
}//fim classe Partida

class Fila {
   	private Partida[] array;
   	private int primeiro; // Remove do indice "primeiro".
   	private int ultimo; // Insere no indice "ultimo".
 
 
   	/******************************************************************************
    	*Metodos: Construtores da classe.
    	*********************************************************************************/
   	public Fila () {
      		this(5);
   	}//fim Fila()
   	public Fila (int tamanho){
      		array = new Partida[tamanho+1];
      		primeiro = ultimo = 0;
   	}//fim Fila()
 
	/********************************************************************************************
	*Metodos: getUltimo() e getPrimeiro()
	*Funcao: retornar o valor de primeiro ou ultimo
	********************************************************************************************/
	public int getUltimo(){
		return this.ultimo;
	}//fim getUltimo()
	public int getPrimeiro(){
		return this.primeiro;
	}//fim getPrimeiro 
   	/********************************************************************************************
	* Metodo: inserir()
    	* Funcao: Insere um elemento na ultima posicao da fila.
    	**********************************************************************************************/
   	public void inserir(int x, Partida[] partida) throws Exception {
 
      		if (((ultimo + 1) % array.length) == primeiro) {	//Gera exception caso a fial esteja cheia
         		this.remover();
      		}//fim if
		if(array[ultimo] == null) array[ultimo] = new Partida();		
 
      		array[ultimo] = partida[x].retornaClone();
      		ultimo = (ultimo + 1) % array.length;
		//this.media( );
   	}//fim inserir
 
 
   	/*********************************************************************************************
    	* Metodo: remover()
	* Funcao: Remove um elemento da primeira posicao da fila e movimenta os demais elementos para o primeiro da mesma.
    	*********************************************************************************************/
   	public Partida remover() throws Exception {
 
      		//validar remocao
      		if (primeiro == ultimo) {	//Gera exception caso a fila esteja vazia
         		throw new Exception("Erro ao remover!");
      		}//fim if
 
		Partida resp = new Partida(); 
		resp = array[primeiro].retornaClone();
      		primeiro = (primeiro + 1) % array.length;
		MyIO.println("(R) "+resp.getCopa()+" - "+resp.getEtapa()+" - "+resp.getTime1()+" x "+resp.getTime2());
      		return resp;
   	}//fim remover()
 
 
   	/********************************************************************************************
    	*Metodo: media()
	*Funcao: Calcula e imprime a media de gols por partida
    	*********************************************************************************************/
   	public void media( ){
      		double soma = 0;
		int cont = 0;

 		if(!this.isVazia()){
      			for(int i = primeiro; i != ultimo; i = ((i + 1) % array.length)) {
         			soma = soma + (double)array[i].getPlacar1() + (double)array[i].getPlacar2();
				cont++;
      			}//fim for
		//	MyIO.println("soma: "+soma);
 		}//fim if

		double media = (double)soma/(double)cont;
		int resultado = (int)Math.round(media);
      		MyIO.println("Média: "+resultado);
   	}//fim mostrar()
 
   	/************************************************************************************************
    	* Metodo: isVazia()
    	* Funcao: retorna um booleano que define se a fila esta ou nao vazia
    	*************************************************************************************************/
   	public boolean isVazia() {
      		return (primeiro == ultimo); 
   	}//fim isVazia()
}//fim Fila()

class TP01P2Q04{
	/*************************************************************************************************
	*Metodo: leEntrada()
	*Entrada: Um array de Strings
	*Saida: Um inteiro representando a quantidade de copas na primeira parte da entrada
	*************************************************************************************************/
	public static int leEntrada(String[] entrada){
		int qtdCopas = 0;
		
		do{
			entrada[qtdCopas] = MyIO.readLine();
		}while(entrada[qtdCopas++].equals("0")==false);
		qtdCopas--;	//desconsidera a ultima entrada

		return qtdCopas;
	}//fim leEntrada()

	/*************************************************************************************************
	*Metodo: executor()
	*Entrada: Uma string(comando a ser executado), Uma lista de partidas
	*************************************************************************************************/
	public static void executor(String comando, Fila fila) throws Exception{
		String[] comandos = comando.split(" ");

		switch(comandos[0].charAt(0)){

			case 'I':
				Partida[] partida = new Partida[100];
				Partida.ler(comandos[1],partida);
				int pos = Integer.parseInt(comandos[2]);

				fila.inserir(pos-1,partida);
				
				break;

			case 'R':
				fila.remover();	
				break;
		}//fim switch
	}//fim executor()

	public static void main(String[] args) throws Exception{
		String[] copas = new String[1000];
                int qtdCopas = leEntrada(copas);	//le as entradas e conta a quantidade de copas
		int qtdCom = MyIO.readInt();	//Le a quantidade de comandos
		String[] comandos = new String[qtdCom];
		Fila fila = new Fila();

		for(int i = 0; i < qtdCom; i++){        //ciclo para ler os comandos
                        comandos[i] = MyIO.readLine();
                }//fim for

		for(int i = 0; i < qtdCopas; i++){	//ciclo contrutor da lista
			Partida[] partida = new Partida[100];
                        int qtdPartida = Partida.ler(copas[i],partida);

			for(int j = 0; j < qtdPartida; j++){
				fila.inserir(j,partida);
				fila.media();
			}//fim for
                }//fim for

		for(int i = 0; i < qtdCom; i++){	//ciclo para execucao dos comandos
			executor(comandos[i],fila);
			fila.media();
		}//fim for
/*
		for(int i = fila.getPrimeiro(); i < fila.getUltimo(); i++){
			fila.media( );
		}//fim for
*/
	}//fim main()
}//fim TP01P2Q02
