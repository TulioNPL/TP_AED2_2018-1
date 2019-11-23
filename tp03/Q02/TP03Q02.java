/********************************************************************************
 *Autor: Tulio N. Polido Lopes
 *Data: 19/04/2018
 *Objetivo: Fazer uma Arvore Binaria de Arvore Binaria de times
 ********************************************************************************/

import java.io.*;
import java.lang.*;
import java.util.*;

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

	/*
	 *Metodos contrutores
	 *Funcao: Criar intancias de Partida
	 */
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

	/*
	 *Metodos: get() e set()
	 *Funcao: Pegar ou guardar valores nas variaveis privadas
	 */
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
	}//fim getCopa()
	public void setPlacar1(int placar1){
		this.placar1 = placar1;
	}//fim setCopa()
	public  int getPlacar2(){
		return this.placar2;
	}//fim getCopa()
	public  void setPlacar2(int placar2){
		this.placar2 = placar2;
	}//fim setCopa()

	public int getDia(){
		return this.dia;
	}//fim getCopa()
	public void setDia(int dia){
		this.dia = dia;
	}//fim setCopa()

	public int getMes(){
		return this.mes;
	}//fim getCopa()
	public void setMes(int mes){
		this.mes = mes;
	}//fim setCopa()

	public String getEtapa(){
		return this.etapa;
	}//fim getCopa()
	public void setEtapa(String etapa){
		this.etapa = etapa;
	}//fim setCopa()

	public String getTime1(){
		return this.time1;
	}//fim getCopa()
	public void setTime1(String time1){
		this.time1 = time1;
	}//fim setCopa()
	public String getTime2(){
		return this.time2;
	}//fim getCopa()
	public void setTime2(String time2){
		this.time2 = time2;
	}//fim setCopa()

	public String getLocal(){
		return this.local;
	}//fim getCopa()
	public void setLocal(String local){
		this.local = local;
	}//fim setCopa()

	/*
	 *Metodo: clonaPartida()
	 *Funcao: retorna um clona da instancia corrente de partida
	 */
	public Partida clonaPartida() throws Exception{
		return (Partida)this.clone();
	}//fim clonaPartida()

	/*
	 *Metodo: imprimir() 
	 *Funcao: imprimir na tela os dados da partida
	 */	
	public void imprimir(){
		MyIO.println("[COPA "+this.copa+"] - "+this.etapa+" - "+this.dia+"/"+this.mes+" - "+this.time1+
				" ("+this.placar1+") x ("+this.placar2+") "+this.time2+"  - "+this.local);
	}//fim imprimir()

	/*
	 *Metodo: ler()
	 *Funcao: Le o arquivo de uma copa
	 */
	public static void ler(String copa, Partida[] partida) throws Exception{
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("/tmp/copa/"+copa+".html"),"ISO-8859-1"));
		boolean ler = false;
		String dadosBrutos = "";
		String linha = br.readLine();

		int qtd = 0;

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

			if(dados[i].contains("/")) qtd++;
		}//fim for		
		criaPartidas(dados,copa,qtd,partida);
	}//fim ler()

	/*
	 *Metodo: criaPartidas()
	 *Entrada: Um array de Strings contendo os dados
	 *Funcao: Criar as intancias de Partida
	 */
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

		int total = getQtdPartidas() + qtd;

		for(int i = getQtdPartidas(); i < total; i++){
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

	/*
	 *Metodo: pegaPlacar1()
	 *Funcao: Retornar o valor int referente ao placar1
	 */
	public static int pegaPlacar1(String s){
		String placar[] = s.split(" x ");
		return Integer.parseInt(placar[0]);
	}//fim pegaDia()

	/*
	 *Metodo: pegaPlacar2()
	 *Funcao: Retornar o valor int referente ao placar2
	 */
	public static int pegaPlacar2(String s){
		String placar[] = s.split(" x ");
		return Integer.parseInt(placar[1]);
	}//fim pegaDia()

	/*
	 *Metodo: pegaDia()
	 *Funcao: Retornar o valor int referente ao dia
	 */
	public static int pegaDia(String s){
		String data[] = s.split("/");
		return Integer.parseInt(data[0]);
	}//fim pegaDia()

	/*
	 *Metodo: pegaMes()
	 *Funcao: Retornar o valor int referente ao mes
	 */
	public static int pegaMes(String s){
		String data[] = s.split("/");
		return Integer.parseInt(data[1]);
	}//fim pegaMes()

	/*
	 *Metodo:retiraEspacos()
	 *Funcao: elimina os espacos excessivos em uma string
	 */
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

	/*
	 *Metodo: retiraTags()
	 *Funcao: eliminar as tags da string
	 */
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

class Time extends Object implements Cloneable{
	private static int qtdTimes = 0;
	private int numPontos,
		jogos,
		vitorias,
		empates,
		derrotas,
		golsPro,
		golsContra,
		saldoGols;
	private String pais;

	/*
	 *Metodos contrutores
	 *Funcao: Criar intancias de Time
	 */
	Time(){
		this.numPontos = 0;
		this.jogos = 0;
		this.vitorias = 0;
		this.empates = 0;
		this.derrotas = 0;
		this.golsPro = 0;
		this.golsContra = 0;
		this.saldoGols = 0;
		this.pais = "";
	}//fim Time()
	Time(String pais, int golsPro, int golsContra, int saldoGols, int vitorias, int derrotas, int empates, int jogos, int numPontos){
		this.setNumPontos(numPontos);
		this.setJogos(jogos);
		this.setVitorias(vitorias);
		this.setEmpates(empates);
		this.setDerrotas(derrotas);
		this.setGolsPro(golsPro);
		this.setGolsContra(golsContra);
		this.setSaldoGols(saldoGols);
		this.setPais(pais);
		qtdTimes++;
	}//fim Time()

	/*
	 *Metodos: get() e set()
	 *Funcao: Pegar ou guardar valores nas variaveis privadas
	 */
	public static int getQtdTimes(){
		return qtdTimes;
	}//fim getQtdTimes()

	public int getNumPontos(){
		return this.numPontos;
	}//fim getNumPontos()
	public void setNumPontos(int numPontos){
		this.numPontos += numPontos;
	}//fim setNumPontos()

	public int getJogos(){
		return this.jogos;
	}//fim getJogos()
	public void setJogos(int jogos){
		this.jogos += jogos;
	}//fim setJogos()
	public  int getVitorias(){
		return this.vitorias;
	}//fim getVitorias()
	public  void setVitorias(int vitorias){
		this.vitorias += vitorias;
	}//fim setVitorias()

	public int getEmpates(){
		return this.empates;
	}//fim getEmpates()
	public void setEmpates(int empates){
		this.empates += empates;
	}//fim setEmpates()

	public int getDerrotas(){
		return this.derrotas;
	}//fim getDerrotas()
	public void setDerrotas(int derrotas){
		this.derrotas += derrotas;
	}//fim setDerrotas()

	public int getGolsPro(){
		return this.golsPro;
	}//fim getGolsPro()
	public void setGolsPro(int golsPro){
		this.golsPro += golsPro;
	}//fim setGolsPro()

	public int getGolsContra(){
		return this.golsContra;
	}//fim getGolsContra()
	public void setGolsContra(int golsContra){
		this.golsContra += golsContra;
	}//fim setGolsContra()

	public int getSaldoGols(){
		return this.saldoGols;
	}//fim getSaldoGols()
	public void setSaldoGols(int saldoGols){
		this.saldoGols += saldoGols;
	}//fim setSaldoGols()

	public String getPais(){
		return this.pais;
	}//fim getPais()
	public void setPais(String pais){
		this.pais = pais;
	}//fim setPais()

	/*
	 *Metodo: clonaTime()
	 *Funcao: Retorna um clone da instancia corrente de Time
	 */
	public Time clonaTime() throws Exception {
		return (Time)this.clone();
	}//fim clonaTime()		
	/*
	 *Metodo: imprimir() 
	 *Funcao: imprimir na tela os dados da partida
	 */	
	public void imprimir(){
		MyIO.println(this.pais+" pg("+this.numPontos+") j("+this.jogos+") v("+this.vitorias+") e("+this.empates+
				") d("+this.derrotas+") gp("+this.golsPro+") gc("+this.golsContra+")  sg("+this.saldoGols+")");
	}//fim imprimir()

	/*
	 * Retorna o historico do time em forma de String
	 * @return String hist, historico do time
	 */
	public String getHist(){
		String hist = this.getPais()+" pg("+this.getNumPontos()+") j("+this.getJogos()+") v("+this.getVitorias()+") e("+this.getEmpates()+
			") d("+this.getDerrotas()+") gp("+this.getGolsPro()+") gc("+this.getGolsContra()+") sg("+this.getSaldoGols()+
			") d("+(this.getNumPontos()*1000+golsPro)+")";

		return hist;
	}//fim getHist()

	/*
	 *Metodo: criaTimes()
	 *Funcao: ler as instancias de partidas e pegar as variaveis importantes para criar times
	 */
	public static void criaTimes(Partida[] partida, Time[] time){		
		int placar1,
		    placar2,
		    posTime1 = -1,
		    posTime2 = -1,
		    vitoriaTime1 = 0,
		    vitoriaTime2 = 0,
		    empateTime1 = 0,
		    empateTime2 = 0,
		    derrotaTime1 = 0,
		    derrotaTime2 = 0,
		    pontosTime1 = 0,
		    pontosTime2 = 0,
		    saldoGolsTime1 = 0,
		    saldoGolsTime2 = 0;
		String time1,
		       time2;

		for(int i = 0; i < time.length; i++){
			time[i] = new Time();
		}//fim for 

		for(int i = 0; i < Partida.getQtdPartidas(); i++){
			placar1 = partida[i].getPlacar1();
			placar2 = partida[i].getPlacar2();
			time1 = partida[i].getTime1();
			time1 = trataPais(time1);	//verifica se o nome do time deve ser substituido
			time2 = partida[i].getTime2();
			time2 = trataPais(time2);	//verirfica se o nome do time deve ser substituido
			saldoGolsTime1 = placar1 - placar2;
			saldoGolsTime2 = placar2 - placar1;

			if(placar1==placar2){
				vitoriaTime1 = 0;
				vitoriaTime2 = 0;
				empateTime1 = 1;
				empateTime2 = 1;
				derrotaTime1 = 0;
				derrotaTime2 = 0;
				pontosTime1 = 1;
				pontosTime2 = 1;

			}//fim if
			else if(placar1 > placar2){
				vitoriaTime1 = 1;
				vitoriaTime2 = 0;
				empateTime1 = 0;
				empateTime2 = 0;
				derrotaTime1 = 0;
				derrotaTime2 = 1;
				pontosTime1 = 3;
				pontosTime2 = 0;
			}//fim else if
			else{
				vitoriaTime1 = 0;
				vitoriaTime2 = 1;
				empateTime1 = 0;
				empateTime2 = 0;
				derrotaTime1 = 1;
				derrotaTime2 = 0;
				pontosTime1 = 0;
				pontosTime2 = 3;
			}//fim else

			for(int j = 0; j < time.length; j++)
				posTime1 = retornaPosicao(time1,time);//retorna a posicao do time no array
			posTime2 = retornaPosicao(time2,time);//caso nao exista retorna -1

			if(posTime1 == -1){	//cria um time1 caso nao exista
				time[Time.getQtdTimes()] = new Time(time1, placar1, placar2, saldoGolsTime1, vitoriaTime1, derrotaTime1, empateTime1, 1, pontosTime1);
			}//fim if
			else{	//adiciona valores caso o time1 exista
				time[posTime1].setGolsPro(placar1);
				time[posTime1].setGolsContra(placar2);
				time[posTime1].setVitorias(vitoriaTime1);
				time[posTime1].setDerrotas(derrotaTime1);
				time[posTime1].setEmpates(empateTime1);
				time[posTime1].setNumPontos(pontosTime1);
				time[posTime1].setSaldoGols(saldoGolsTime1);
				time[posTime1].setJogos(1);
			}//fim else

			if(posTime2 == -1){	//cria um time2 caso nao exista
				time[Time.getQtdTimes()] = new Time(time2, placar2, placar1,saldoGolsTime2, vitoriaTime2, derrotaTime2, empateTime2, 1, pontosTime2);
			}//fim if
			else{	//adiciona valores caso o time2 exista
				time[posTime2].setGolsPro(placar2);
				time[posTime2].setGolsContra(placar1);
				time[posTime2].setVitorias(vitoriaTime2);
				time[posTime2].setDerrotas(derrotaTime2);
				time[posTime2].setEmpates(empateTime2);
				time[posTime2].setNumPontos(pontosTime2);
				time[posTime2].setSaldoGols(saldoGolsTime2);
				time[posTime2].setJogos(1);
			}//fim else
		}//fim for
	}//fim criaTimes()

	/*
	 *Metodo: retornaPosicao()
	 *Funcao: retorna a posicao do time no array, caso nao exista retorna -1
	 */

	public static int retornaPosicao(String time,Time[] times){
		int pos = -1;
		String aux;

		for(int i = 0; i < Time.getQtdTimes(); i++){
			aux = times[i].getPais();

			if(aux.equals(time)){
				pos = i;
				i = Time.getQtdTimes();
			}//fim if
		}//fim for

		return pos;
	}//fim retornaPosicao()

	/*
	 *Metodo: trataPais()
	 *Funcao: recebe uma String com o nome de um pais e substitui por outro caso haja necessidade
	 */

	public static String trataPais(String aux){
		switch(aux){
			case "Iugoslávia":
				aux = "Sérvia";
				break;
			case "Tchecoslováquia":
				aux = "República Tcheca";
				break;
			case "Alemanha Ocidental":
				aux = "Alemanha";
				break;
			case "Sérvia e Montenegro":
				aux = "Sérvia";
				break;
			case "União Soviética":
				aux = "Rússia";
				break;
		}//fim switch

		return aux;
	}//fim trataPais()
}//fim classe Times

class No {
	public int elemento; // Conteudo do no.
	public No esq; // No da esquerda.
	public No dir; // No da direita.
	public No2 outro;

	/**
	 * Construtor da classe.
	 * @param elemento Conteudo do no.
	 */
	No(int elemento) {
		this.elemento = elemento;
		this.esq = this.dir = null;
		this.outro = null;
	}//fim No()

	/**
	 * Construtor da classe.
	 * @param elemento Conteudo do no.
	 * @param esq No da esquerda.
	 * @param dir No da direita.
	 */
	No(int elemento, No esq, No dir) {
		this.elemento = elemento;
		this.esq = esq;
		this.dir = dir;
		this.outro = null;
	}//fim No()
}//fim classe No

class No2 {
	public Time elemento; // Conteudo do no.
	public No2 esq; // No da esquerda.
	public No2 dir; // No da direita.

	/**
	 * Construtor da classe.
	 * @param elemento Conteudo do no.
	 */
	No2(Time elemento) {
		this.elemento = elemento;
		this.esq = this.dir = null;
	}//fim No2()

	/**
	 * Construtor da classe.
	 * @param elemento Conteudo do no.
	 * @param esq No2 da esquerda.
	 * @param dir No2 da direita.
	 */
	No2(Time elemento, No2 esq, No2 dir) {
		this.elemento = elemento;
		this.esq = esq;
		this.dir = dir;
	}//fim No2()
}//fim classe No2

class ArvoreArvore {
	private No raiz; // Raiz da arvore.
	public static int comp;

	/**
	 * Construtor da classe.
	 */
	public ArvoreArvore() throws Exception {
		comp = 0;
		raiz = null;
		inserir(7);
		inserir(3);
		inserir(11);
		inserir(1);
		inserir(5);
		inserir(9);
		inserir(12);
		inserir(0);
		inserir(2);
		inserir(4);
		inserir(6);
		inserir(8);
		inserir(10);
		inserir(13);
		inserir(14);
	}//fim ArvoreArvore()

	/**
	 * Metodo publico iterativo para pesquisar elemento.
	 * @param elemento Elemento que sera procurado.
	 * @return <code>true</code> se o elemento existir,
	 * <code>false</code> em caso contrario.
	 */
	public boolean pesquisar(String elemento) {
		MyIO.print(elemento + " raiz ");
		return pesquisar(raiz, elemento);
	}//fim pesquisar()

	private boolean pesquisar(No i, String x) {
		boolean resp = false;
		if(i != null){
			MyIO.print("ESQ ");
			resp = pesquisar(i.esq,x);

			if(!resp){
				MyIO.print("raiz ");
				resp = pesquisar(i.outro,x);

				if (!resp) {
					MyIO.print("DIR ");
					resp = pesquisar(i.dir,x);
				}//end if
			}//end if
		}//end if
		return resp;
	}//end pesquisar()

	private boolean pesquisar(No2 i, String x){
		boolean resp;
		if(i == null){
			resp = false;
		} else if(x.compareTo(i.elemento.getPais()) == 0) {
			//MyIO.print(i.elemento.getPais()+" ");
			resp = true;
		} else {
			//MyIO.print(i.elemento.getPais()+" ");
			MyIO.print("esq ");
			resp = pesquisar(i.esq,x);
			if(!resp){
				MyIO.print("dir ");
				resp = pesquisar(i.dir,x);
			}//end if
		}//end else
		return resp;
	}//end pesquisar()

	/*
	 *Insere um elemento na arvore interna
	 *@param x Time, elemento a ser inserido
	 */
	public void inserir(Time x) throws Exception{
		inserir(x, raiz);
	}//fim inserir()
	private void inserir(Time x, No i) throws Exception {
		if(i == null) {
			throw new Exception("Erro ao inserir!");
		} else if(x.getNumPontos() % 15 < i.elemento) {
			comp++;
			inserir(x,i.esq);
		} else if(x.getNumPontos() % 15 > i.elemento) {
			comp+=2;
			inserir(x,i.dir);
		} else {
			comp+=2;
			i.outro = inserir(x,i.outro);
		}//fim else
	}//fim inserir()
	private No2 inserir(Time x, No2 i){
		if(i == null){
			i = new No2(x);
		} else if(x.getNumPontos() < i.elemento.getNumPontos()) {
			comp++;
			i.esq = inserir(x,i.esq);
		} else if(x.getNumPontos() > i.elemento.getNumPontos()) {
			comp+=2;
			i.dir = inserir(x,i.dir);
		}//fim else if
		return i;
	}//fim inserir()

	/*
	 *Insere um elemento na arvore externa
	 *@param x int, elemento a ser inserido
	 */
	private void inserir(int x) throws Exception{
		raiz = inserir(x,raiz);
	}//fim inserir()
	private No inserir(int x, No i) throws Exception{
		if(i == null){
			i = new No(x);
		} else if(x < i.elemento) {
			comp++;
			i.esq = inserir(x,i.esq);
		} else if(x > i.elemento) {
			comp+=2;
			i.dir = inserir(x,i.dir);
		} else {
			comp+=2;
			throw new Exception("Erro ao inserir na Arvore Externa!");
		}//fim else
		return i;
	}//fim inserir()

	/*
	 *Imprime os elementos
	 */
	public void mostrar(){
		MyIO.print("[");
		mostrarPre(raiz);
		MyIO.print("]\n");
	}//fim mostrar()

	/*
	 *Imprime os elementos das Arvores Internas
	 *@param i No, No a te os No2 mostrados
	 */
	public void mostrarPre(No i){
		if(i != null){
			mostrarPre(i.outro);
			mostrarPre(i.esq);
			mostrarPre(i.dir);
		}//fim if
	}//fim mostrarPre()

	/*
	 *Imprime os elementos da Arvores Internas
	 *@param i No2, No2 a ter seu elemento impresso
	 */
	public void mostrarPre(No2 i){
		if(i != null){
			MyIO.print(i.elemento.getNumPontos()+"("+i.elemento.getPais()+") ");
			mostrarPre(i.esq);
			mostrarPre(i.dir);
		}//fim if
	}//fim mostrarPre()

	/**
	 * Metodo publico iterativo para remover elemento.
	 * @param x Elemento a ser removido.
	 * @throws Exception Se nao encontrar elemento.
	 */
	public void remover(String x) throws Exception {
		remover(x, raiz);
	}//fim remover()

	/**
	 * Metodo privado recursivo para remover elemento.
	 * @param x Elemento a ser removido.
	 * @param i No em analise.
	 * @return No em analise, alterado ou nao.
	 * @throws Exception Se nao encontrar elemento.
	 */
	private void remover(String x, No i) throws Exception {
		if(i != null) {
			i.outro = remover(x,i.outro);
			remover(x,i.esq);
			remover(x,i.dir);
		}//fim if        
	}//fim remover()

	/*
	 *Remove o elemento
	 *@param x String, String do elemento a ser removido
	 *@param i No2, No2 a sofrer busca pelo elemento a ser removido
	 */
	private No2 remover(String x, No2 i) throws Exception {
		if(i != null) {
			if(x.compareTo(i.elemento.getPais()) == 0) {
				if (i.dir == null) {
					comp+=3;
					i = i.esq;
					// Sem no a esquerda.
				} else if (i.esq == null) {
					comp+=4;
					i = i.dir;
					// No a esquerda e no a direita.
				} else {
					comp+=4;
					i.esq = antecessor(i, i.esq);
				}//fim else
			} else {
				i.esq = remover(x,i.esq);
				i.dir = remover(x,i.dir);
			}//fim else
		}//end if
		return i;
	}//fim remover()

	/**
	 * Metodo para trocar no removido pelo antecessor.
	 * @param i No2 que teve o elemento removido.
	 * @param j No2 da subarvore esquerda.
	 * @return No2 em analise, alterado ou nao.
	 */
	private No2 antecessor(No2 i, No2 j) throws Exception {
		// Existe no a direita.
		if (j.dir != null) {
			// Caminha para direita.
			j.dir = antecessor(i, j.dir);
			// Encontrou o maximo da subarvore esquerda.
		} else {
			i.elemento = j.elemento.clonaTime(); // Substitui i por j.
			j = j.esq; // Substitui j por j.ESQ.
		}//fim else
		return j;
	}//fim antecessor()

	public void mostraInterna(){
		mostraInterna(raiz);
	}

	private void mostraInterna(No i){
		if(i!=null){
			mostraInterna(i.outro);
			MyIO.print("\n");
			MyIO.print("ESQ ");
			mostraInterna(i.esq);
			MyIO.print("DIR ");
			mostraInterna(i.dir);
		}
	}

	private void mostraInterna(No2 i){
		if(i!=null){
			MyIO.print(i.elemento.getPais()+" ");
			MyIO.print("esq ");
			mostraInterna(i.esq);
			MyIO.print("dir ");
			mostraInterna(i.dir);
		}
	}
}//fim classe ArvoreBinaria

class TP03Q02{
	/*
	 *Metodo: leEntrada()
	 *Entrada: Um array de Strings
	 *Saida: Um inteiro representando a quantidade de copas na primeira parte da entrada
	 */
	public static int leEntrada(String[] entrada){
		int qtdCopas = 0;

		do{
			entrada[qtdCopas] = MyIO.readLine();
		}while(entrada[qtdCopas++].equals("0")==false);
		qtdCopas--;	//desconsidera a ultima entrada

		return qtdCopas;
	}//fim leEntrada()

	/*
	 *Metodo: leChaves()
	 *Funcao: ler as chaves de pesquisa da entrada padrao
	 *Retorna: Um valor inteiro referente a quantidade de chaves
	 */
	public static int leChaves(String[] chaves){
		int qtdChaves = 0;

		do{
			chaves[qtdChaves] = MyIO.readLine();
		}while(chaves[qtdChaves++].equals("FIM")==false);
		qtdChaves--;	//desconsidera a entrada "FIM"

		return qtdChaves;
	}//fim leChaves()

	/*
	 *Metodo: escreveDados()
	 *Funcao: escrever em um arquivo os dados do algoritmo
	 */
	public static void escreveDados(long tempo) throws Exception{
		File arq = new File("605286_arvoreArvore.txt");
		FileWriter fw = new FileWriter(arq);
		BufferedWriter bw = new BufferedWriter(fw);

		bw.write("605286\tTempo de execução: "+tempo/1000.0+" s.\tNúmero de comparações: "+ArvoreArvore.comp);
		bw.close();
	}//fim escreveDados()

	/*
	 *Comanda a remoção dos países que já sediaram a copa
	 *@param arvore ArvoreBinaria, Arvore Binaria que sofrera remocoes
	 */
	public static void removeSedes(ArvoreArvore arvore) throws Exception {
		arvore.remover("África do Sul");
		arvore.remover("Alemanha");
		arvore.remover("Argentina");
		arvore.remover("Brasil");
		arvore.remover("Chile");
		arvore.remover("Coreia do Sul");
		arvore.remover("Espanha");
		arvore.remover("Estados Unidos");
		arvore.remover("França");
		arvore.remover("Inglaterra");
		arvore.remover("Itália");
		arvore.remover("Japão");
		arvore.remover("México");
		arvore.remover("Suécia");
		arvore.remover("Suíça");
		arvore.remover("Uruguai");
	}//fim removeSedes()

	public static void main(String[] args) throws Exception{
		boolean existe;
		long inicio,
		     fim,
		     tempo;
		String[] copas = new String[1000];
		int qtdCopas = leEntrada(copas);	//le as entradas e conta a quantidade de copas
		String[] chaves = new String[1000];
		int qtdChaves = leChaves(chaves);	//le as entradas e conta a quantidade de chaves
		ArvoreArvore arvore = new ArvoreArvore();
		Partida[] partida = new Partida[1000];
		Time[] time = new Time[500];

		inicio = new Date().getTime();


		for(int i = 0; i < qtdCopas; i++){	//ciclo para leitura das partidas
			Partida.ler(copas[i],partida);
		}//fim for

		Time.criaTimes(partida,time);

		for(int i = 0; i < Time.getQtdTimes(); i++){	//ciclo para inserir os times na Arvore
			arvore.inserir(time[i]);
		}//fim for

		arvore.mostraInterna();
		removeSedes(arvore);
		arvore.mostraInterna();

		for(int i = 0; i < qtdChaves; i++){
			existe = arvore.pesquisar(chaves[i]);
			if(existe){
				MyIO.println("SIM");
			}//fim if
			else{
				MyIO.println("NÃO");
			}//fim else
		}//fim for

		fim = new Date().getTime();
		tempo = fim - inicio;

		escreveDados(tempo);
	}//fim main()
}//fim TP03Q02
