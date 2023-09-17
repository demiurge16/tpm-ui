# System organizacji pracy dla biura tłumaczeń

## Spis treści

* [Wprowadzenie](#wprowadzenie)
  * [Biznes tłumaczeń w dzisiejszych czasach](#biznes-tłumaczeń-w-dzisiejszych-czasach)
  * [Wspóczesne zarządzanie projektami](#wspóczesne-zarządzanie-projektami)
  * [Systemy zarządzania projektami i ich rola w branży tłumaczeniowej](#systemy-zarządzania-projektami-i-ich-rola-w-branży-tłumaczeniowej)
* [Koncepcja aplikacji](#koncepcja-aplikacji)
  * [Geneza projektu i inspiracje](#geneza-projektu-i-inspiracje)
  * [Założenia i cele projektu](#założenia-i-cele-projektu)
  * [Funkcjonalności aplikacji](#funkcjonalności-aplikacji)
* [Projekt aplikacji](#projekt-aplikacji)
  * [Przypadki użycia i historyjki użytkownika](#przypadki-użycia-i-historyjki-użytkownika)
    * [Jako użytkownik, chcę:](#jako-użytkownik-chcę)
    * [Jako administrator systemu, chcę:](#jako-administrator-systemu-chcę)
    * [Jako kierownik projektu, chcę:](#jako-kierownik-projektu-chcę)
    * [Jako tłumacz, redaktor, korektor, ekspert merytoryczny czy edytor chcę:](#jako-tłumacz-redaktor-korektor-ekspert-merytoryczny-czy-edytor-chcę)
    * [Jako inżynier wsparcia, chcę:](#jako-inżynier-wsparcia-chcę)
  * [Diagram klas](#diagram-klas)
  * [Diagramy stanów](#diagramy-stanów)
  * [Diagram infrastruktury](#diagram-infrastruktury)
  * [Zasady projektowania systemu](#zasady-projektowania-systemu)
    * [Filozofia projektu](#filozofia-projektu)
    * [Domain-driven design (DDD)](#domain-driven-design-ddd)
    * [Architektura heksagonalna, czyli wzorzec Porty i adaptery (HA)](#architektura-heksagonalna-czyli-wzorzec-porty-i-adaptery-ha)
    * [Wstrzykiwanie zależności (DI)](#wstrzykiwanie-zależności-di)
    * [Logowanie i monitorowanie](#logowanie-i-monitorowanie)
    * [Kombinacja DDD, HA, DI i logowania/monitorowania](#kombinacja-ddd-ha-di-i-logowaniamonitorowania)
    * [Architektura wielowarstwowa](#architektura-wielowarstwowa)
* [Stos technologiczny](#stos-technologiczny)
  * [Postanowienia ogólne w wyborze technologii](#postanowienia-ogólne-w-wyborze-technologii)
  * [Interfejs użytkownika](#interfejs-użytkownika)
  * [Serwer aplikacji](#serwer-aplikacji)
  * [Przechowywanie danych](#przechowywanie-danych)
  * [Zewnętrzne API](#zewnętrzne-api)
  * [Monitorowanie i analiza pracy aplikacji](#monitorowanie-i-analiza-pracy-aplikacji)
  * [Testowanie](#testowanie)
  * [Wdrożenie](#wdrożenie)
  * [Uwierzytelnianie i autoryzacja](#uwierzytelnianie-i-autoryzacja)
* [Implementacja](#implementacja)
  * [Przygotowanie środowiska](#przygotowanie-środowiska)
    * [Instalacja Node.js](#instalacja-nodejs)
    * [Instalacja Docker](#instalacja-docker)
    * [Instalacja Visual Studio Code](#instalacja-visual-studio-code)
    * [Instalacja IntelliJ IDEA](#instalacja-intellij-idea)
    * [Instalacja Git](#instalacja-git)
  * [Interfejs użytkownika](#interfejs-użytkownika-1)
    * [Tworzenie projektu za pomocą Create React App](#tworzenie-projektu-za-pomocą-create-react-app)
    * [Instalacja dodatkowych bibliotek](#instalacja-dodatkowych-bibliotek)
    * [Implementacja klienta serwera aplikacji](#implementacja-klienta-serwera-aplikacji)
    * [Implementacja komponentów](#implementacja-komponentów)
    * [Implementacja kontekstów](#implementacja-kontekstów)
    * [Implementacja układu strony](#implementacja-układu-strony)
    * [Implementacja pojedynczych widoków](#implementacja-pojedynczych-widoków)
    * [Utylity](#utylity)
    * [Plik Dockerfile i konfiguracja Nginx](#plik-dockerfile-i-konfiguracja-nginx)
  * [Serwer aplikacji](#serwer-aplikacji-1)
    * [Tworzenie projektu za pomocą Spring Initializr](#tworzenie-projektu-za-pomocą-spring-initializr)
    * [Gradle i instalacja dodatkowych bibliotek](#gradle-i-instalacja-dodatkowych-bibliotek)
    * [Implementacja domeny aplikacji](#implementacja-domeny-aplikacji)
    * [Implementacja portów i adapterów](#implementacja-portów-i-adapterów)
    * [Integracja domeny z portami i adapterami](#integracja-domeny-z-portami-i-adapterami)
    * [Integracja z zewnętrznymi API](#integracja-z-zewnętrznymi-api)
    * [Konfiguracja Spring Security](#konfiguracja-spring-security)
    * [Plik konfiguracyjny aplikacji Spring Boot](#plik-konfiguracyjny-aplikacji-spring-boot)
    * [Plik Dockerfile](#plik-dockerfile)
    * [Testy za pomocą JUnit i Mockito](#testy-za-pomocą-junit-i-mockito)
  * [Infrastruktura](#infrastruktura)
    * [Docker Compose](#docker-compose)
    * [Konfiguracja instancji Keycloak](#konfiguracja-instancji-keycloak)
    * [Konfiguracja instancji PostgreSQL](#konfiguracja-instancji-postgresql)
    * [Konfiguracja instancji Redis](#konfiguracja-instancji-elasticsearch)
    * [Konfiguracja instancji MinIO](#konfiguracja-instancji-minio)
    * [Konfiguracja stosu ELK](#konfiguracja-stosu-elk)
* [Prezentacja](#prezentacja)
  * [Rejestracja nowego użytkownika](#rejestracja-nowego-użytkownika)
  * [Logowanie się do systemu](#logowanie-się-do-systemu)
  * [Zarządzanie słownikami](#zarządzanie-słownikami)
  * [Zarządzanie bazą klientów](#zarządzanie-bazą-klientów)
  * [Zarządzanie projektami](#zarządzanie-projektami)
    * [Przegląd projektów](#przegląd-projektów)
    * [Tworzenie i edycja projektu](#tworzenie-i-edytowanie-projektu)
    * [Zmiana statusu projektu](#zmiana-statusu-projektu)
    * [Zmiana terminu realizacji projektu](#zmiana-terminu-realizacji-projektu)
    * [Podział projektu na zadania](#podział-projektu-na-zadania)
    * [Zarządzanie zadaniami](#zarządzanie-zadaniami)
    * [Zarządzanie kosztami realizacji projektu](#zarządzanie-kosztami-realizacji-projektu)
    * [Zarządzanie dokumentami projektu](#zarządzanie-dokumentami-projektu)
    * [Komunikacja w ramach projektu](#komunikacja-w-ramach-projektu)
  * [Monitorowanie pracy systemu](#monitorowanie-pracy-systemu)
* [Przyszłość systemu](#przyszłość-systemu)
  * [Integracja z narzędziami maszynowego tłumaczenia](#integracja-z-narzędziami-maszynowego-tłumaczenia)
  * [Integracja z narzędziami do analizy tekstu](#integracja-z-narzędziami-do-analizy-tekstu)
  * [Integracja ze słownikami terminologicznymi](#integracja-ze-słownikami-terminologicznymi)
  * [Glosariusze](#glosariusze)
  * [Rozbudowanie możliwości raportowania](#rozbudowanie-możliwości-raportowania)
  * [Usprawnienia monitorowania pracy systemu](#podalsze-usprawnienia-monitorowania-pracy-systemu)

## Wprowadzenie

### Biznes tłumaczeń w dzisiejszych czasach

W dzisiejszych czasach, wraz z globalizacją i rosnącym handlem międzynarodowym, rola tłumaczeń biznesowych staje się niezwykle ważna. Przedsiębiorstwa, dążąc do ekspansji na rynkach zagranicznych, muszą dostosowywać swoje materiały, takie jak umowy, dokumenty finansowe, strategie marketingowe, raporty, prezentacje czy strony internetowe, do języka i kultury docelowej. Tłumaczenia biznesowe, ze względu na specyfikę, wymagają nie tylko doskonałej znajomości języka, ale także specjalistycznej wiedzy w danej branży. Błędy w tłumaczeniu mogą prowadzić do poważnych nieporozumień, które mogą mieć negatywne konsekwencje dla firmy.
W związku z tym wiele firm decyduje się na współpracę z profesjonalnymi biurami tłumaczeń, które oferują usługi dostosowane do specyficznych potrzeb biznesu. Tłumacze specjalizujący się w danych dziedzinach zapewniają wysoką jakość i precyzję tłumaczeń, co jest kluczem do budowania zaufania i pozytywnego wizerunku na rynkach międzynarodowych[1][2][4].

Globalizacja rynków prowadzi do zwiększenia znaczenia kultury w komunikacji biznesowej. Tłumaczenie tekstu to jedno, ale dostosowanie go do specyfiki kulturowej docelowego kraju to zadanie o wiele bardziej złożone, a jednocześnie kluczowe dla skuteczności przekazu. To właśnie proces nazywamy lokalizacją.
Lokalizacja to proces adaptacji produktu lub treści do specyfiki kulturowej, językowej, prawnej i innych aspektów konkretnego rynku docelowego. Chodzi tu nie tylko o tłumaczenie językowe, ale także o uwzględnienie różnic kulturowych, norm społecznych, zwyczajów, wartości oraz oczekiwań docelowej grupy odbiorców.

**Dlaczego lokalizacja jest ważna?**:
1. **Zrozumienie rynku**: Lokalizacja pozwala firmom na lepsze zrozumienie potrzeb i oczekiwań lokalnych konsumentów, co przekłada się na skuteczniejszą komunikację i większe zaufanie do marki.
2. **Budowanie relacji**: Dostosowanie treści do lokalnych realiów pozwala na nawiązanie głębszej relacji z klientem, co z kolei prowadzi do lojalności i większego zaangażowania.
3. **Unikanie wpadek kulturowych**: Niedostosowanie treści do kultury docelowej może prowadzić do nieporozumień, a w skrajnych przypadkach nawet do skandalów. Lokalizacja minimalizuje ryzyko nieświadomego popełnienia kulturowych faux pas.

**Przykłady lokalizacji**:
1. **Reklama**: Słynny przykład dotyczy Chevroleta, który wprowadził na rynek latynoamerykański model o nazwie Nova. W języku hiszpańskim "no va" oznacza "nie jedzie", co nie było najlepszym wyborem dla samochodu.
2. **Strony internetowe**: Wiele firm dostosowuje design, treści i funkcje swoich stron do lokalnych oczekiwań, np. różne metody płatności czy odmienne grafiki związane z lokalnymi świętami.
3. **Gry komputerowe**: Lokalizacja gier to nie tylko tłumaczenie dialogów, ale także dostosowywanie postaci, scenariuszy czy nawet mechaniki gry do lokalnych oczekiwań.

**Wykorzystanie technologii**: Lokalizacja korzysta z zaawansowanych narzędzi technologicznych, które pozwalają na efektywną adaptację treści. Przykładowo, systemy zarządzania tłumaczeniami (TMS) mogą automatycznie identyfikować elementy do lokalizacji, a także dbać o spójność terminologiczną.

Lokalizacja to kluczowy element strategii międzynarodowej każdej firmy, która dąży do skutecznej komunikacji z klientami na różnych rynkach. W erze globalizacji nie wystarczy już tylko tłumaczyć - trzeba "mówić" językiem kultury.

W świecie, gdzie interakcje międzynarodowe stały się codziennością, tłumaczenia ustne odgrywają kluczową rolę w wielu aspektach komunikacji. Od spotkań biznesowych, przez konferencje naukowe, po wydarzenia kulturalne - profesjonalne tłumaczenia ustne są niezbędne, by zapewnić płynny przepływ informacji między ludźmi różnych narodowości i kultur.

**Rodzaje tłumaczeń ustnych**:
1. **Tłumaczenie konsekutywne**: Tłumacz przekazuje treść po tym, jak mówca skończy wypowiedź. Jest to często stosowane w małych grupach lub w trakcie spotkań biznesowych.
2. **Tłumaczenie symultaniczne**: Tłumacz przekazuje treść niemal jednocześnie z mówcą, zwykle pracując w kabinie dźwiękoszczelnej. Jest to typ tłumaczenia popularny na dużych konferencjach czy wydarzeniach międzynarodowych.
3. **Tłumaczenie szeptane**: Tłumacz siedzi obok osoby, która potrzebuje tłumaczenia, i szeptem przekazuje jej treść wypowiedzi.

**Kluczowe znaczenie tłumaczeń ustnych**:
1. **Przekroczenie barier językowych**: Tłumaczenia ustne umożliwiają płynną komunikację między osobami, które nie mówią tym samym językiem, eliminując jednocześnie ryzyko nieporozumień.
2. **Kulturowa adaptacja**: Profesjonalni tłumacze ustni nie tylko przekładają słowa, ale również dostosowują komunikat do specyfiki kulturowej odbiorców, uwzględniając niuanse, zwyczaje i kontekst.
3. **Dostępność informacji**: Na dużych konferencjach czy seminarium tłumaczenia ustne gwarantują, że każdy uczestnik, niezależnie od jego języka ojczystego, ma dostęp do tej samej wiedzy i informacji.
4. **Profesjonalizm w biznesie**: W kontekście biznesowym tłumaczenia ustne są często kluczem do sukcesu, umożliwiając precyzyjne negocjacje, budowanie zaufania i rozwijanie relacji z partnerami międzynarodowymi.

**Wyzwania związane z tłumaczeniami ustnymi**:
- **Wysoki poziom stresu**: Tłumaczenie symultaniczne wymaga niezwykle wysokiej koncentracji i jest bardzo wymagające psychicznie.
- **Potrzeba ciągłego doskonalenia**: Świat jest w ciągłym ruchu, a wraz z nim ewoluują języki i terminologia. Dlatego tłumacze muszą nieustannie podnosić swoje kwalifikacje.
- **Różnorodność tematyczna**: Tłumacze często muszą radzić sobie z tematyką, która jest dla nich nowa, co wymaga szybkiego przyswajania informacji.

Z kolei technologia, w tym sztuczna inteligencja, rewolucjonizuje branżę tłumaczeń. Narzędzia tłumaczeniowe oparte na AI pozwalają na szybsze i bardziej efektywne tłumaczenia, co z kolei przyczynia się do zwiększenia konkurencyjności firmy na globalnym rynku. Niemniej jednak, niezależnie od technologii, ludzki dotyk i ekspertyza w tłumaczeniu pozostają niezastąpione [3]. Istnieje kilka powodów, dla których SI nie jest jeszcze w stanie zastąpić tłumaczy[6][7]:

1. **Brak kontekstu**: W przetwarzaniu języka naturalnego kontekst jest kluczowy dla zrozumienia tekstu. SI może mieć trudności w zrozumieniu kontekstu, co prowadzi do błędów tłumaczeniowych.
2. **Złożoność języka naturalnego**: Język naturalny jest bardzo złożony i ma wiele niuansów i subtelnych znaczeń. SI może mieć trudności w przeniesieniu tych niuansów i znaczeń na inny język.
3. **Złożoność tłumaczenia**: Tłumaczenie to nie tylko przekładanie słów z jednego języka na drugi. To proces interpretacji i przekazywania znaczenia tekstu, co wymaga wiedzy i doświadczenia, którego SI nie posiada.
4. **Jakość tłumaczenia**: Mimo postępu w rozwoju SI, wciąż nie jest w stanie osiągnąć jakości tłumaczenia, która byłaby wystarczająca do zastąpienia tłumaczy. Żywi tłumacze posiadają wiedzę i doświadczenie, które pozwala im na tworzenie dokładnych i precyzyjnych tłumaczeń.

Pomimo tych ograniczeń, SI może nadal odgrywać ważną rolę w procesie tłumaczenia. Może pomóc w automatyzacji procesów tłumaczeniowych, takich jak tłumaczenie dokumentów lub stron internetowych, ale wciąż potrzebuje wsparcia żywych tłumaczy, którzy sprawdzą i poprawią jakość tłumaczeń [5].

Podsumowując, w dobie globalizacji i rosnącego znaczenia międzynarodowego handlu oraz komunikacji, tłumaczenia - zarówno pisemne, jak i ustne - odgrywają kluczową rolę w budowaniu relacji, prowadzeniu biznesu i wymianie informacji między różnymi kulturami i narodami. Chociaż technologia, w tym sztuczna inteligencja, wnosi ważny wkład w usprawnienie i przyspieszenie procesów tłumaczeniowych, niezastąpionym elementem tłumaczenia pozostaje człowiek, który jest w stanie zrozumieć kontekst, niuanse i subtelności języka. Współpraca między ludźmi a technologią to przyszłość branży tłumaczeniowej, łącząca najlepsze z obu światów.

Źródła:

1. "Business Translation Services for Global Enterprises" - TransPerfect - https://www.transperfect.com/services/business-translation-services [dostęp: 21.02.2023]
2. "What is Business Translation?" - SDL - https://www.sdl.com/solutions/translation/what-is-business-translation/ [dostęp: 21.02.2023]
3. "The Role of Translation in Global Business" - Multilingua Blog - https://www.multilingua.com/blog/the-role-of-translation-in-global-business/ [dostęp: 21.02.2023]
4. "Business Translation Services" - LingvoHouse - https://lingvohouse.com/services/business-translation/ [dostęp: 21.02.2023]
5. "Can AI Replace Human Translators?" - TAUS - https://www.taus.net/think-tank/articles/can-ai-replace-human-translators [dostęp: 21.02.2023]
6. "The Pros and Cons of Artificial Intelligence in Translation" - Memsource - https://www.memsource.com/blog/2018/01/18/the-pros-and-cons-of-artificial-intelligence-in-translation/ [dostęp: 21.02.2023]
7. "Why AI will never replace human translators" - LanguageWire - https://www.languagewire.com/en/blog/why-ai-will-never-replace-human-translators [dostęp: 21.02.2023]

###	Wspóczesne zarządzanie projektami

Wykonanie każdego zadania, nieważne jak skomplikowane i wielkie - czy była by to budowa nowego wieżowca czy otwarcie małego osiedlowego sklepu - może być nazwane projektem. Większość z nas dokładnie wie, jak tego rodzaju dzieła kształtują nasz życiu osobistym i/lub zawodowym. Niestety, nie wszystkie projekty kończą się pełnym sukcesem. Zdarzają się prekroczenia budżetów i terminów realizacji, mogą nie spełniać wymagań stawianych przez klientów lub przez nas samych. Część projektów zostaje porzucona.

Umiejętne zarządzanie jest ważnym czynnikiem, mającym znaczący wpływ na sukces w przeprowadzaniu projektu. Skuteczne zarządzanie opiera się na wysokim poziomie kompetencji w kilku obszarach. Potrzebne są umiejętności optymalnego planowania, podtrzymania motywacji zespołu, komunikacji interpersonalnej oraz często szeroka wiedza techniczna i dziedzinowa. Wszystkie te elementy są istotne podczas realizacji różnorodnych typów projektów i maja olbrzymi wpływ na ich końcowy sukces [1]. Zarządzanie projektami dzisiaj zajmuje się zbieraniem wiedzy i poszerzaniem wiedzy oraz budowaniem narzędzi, metodyk i technik, które pomagają w efektywnej realizacji projektów. Zarządzanie projektami jest bardzo bogatą i szeroką dyscypliną zawiera w sobie tysiące lat doświadczenia w realizacji różnej skali projektów i stanowi jedną z najbardziej dynamicznie rozwijających się dziedzin zarządzania. Wiele organizacji, w tym także te związane z tłumaczeniami, zaczyna dostrzegać korzyści płynące z zastosowania narzędzi i technik zarządzania projektami.

Pierwsza połowa XX wieku stała się początkiem ery szerokiego użycia nowych technologii i narzędzi. Upowszechnienie samolotów i samochodów poskutkowało zwiększeniem mobilności zasobów i pozwoliło na dużo bardziej efektywną ich alokację. Rozwój środków telekomunikacji w postaci telegrafów i telefonów spowodował zanczące uproszenia w komunikacji na duże odłegłosći. Pojawiały się pierwsze komputery i bazy danych, co z kolei uprościło różnolakie obliczenia i procesy administracyjne. Kolejnym ważnym w tym okresie wydarzeniem było pojawienie się pierwszych koncepcji zarządzania projektami. W 1917 roku Henry Gantt opracował jeden ze swoich najważniejszych wkładów w dziedzinę zarządzania projektami: diagram Gantta, który pozwalał na wizualizację harmonogramu projektu. Jednym z pierwszych zastosowań wykresu Gantta w dużych projektach było planowanie i realizacja budowy Zapory Hoovera w latach 1931-1936[2]. 

Za początek współczesnego zarządzania projektami można uznać założenie w 1956 roku Amerykańskiego Stowarzyszenia Inżynierów Kosztów (ang. The American Association of Cost Engineers, dzisiaj znane jako AACE International). Jest to wiodące stowarzyszenie zawodowe skupiające kosztorysantów, inżynierów kosztów, planistów, kierowników projektów i specjalistów ds. kontroli projektów. W kolejnych latach zaczęły pojawiać się pierwsze metodyki zarządzania projektami, takie jak CPM/PERT. W roku 1969 powstał Project Management Institute (PMI), który jest największą organizacją na świecie zrzeszającą specjalistów z zakresu zarządzania projektami. W kolejnych latach zaczęły pojawiać się kolejne metodyki zarządzania projektami, takie jak PRINCE2, PMBOK, Scrum, Kanban, Lean, itd.

Na przestrzeni lat możemy zauważyć jak podejście do zarządzania projektami zmieniało się od bardziej "sztywnego" sekwencyjnego podejścia, które zakładało że wszystkie wymagania projektówe są znane na początku realizacji do "reaktywnego" zwinnego podejścia, które pozwalało lepiej przystosować się do ciągle zmieniających sie potrzeb. Zmiany te wynikały ze wzrostem skali i złożoności projektów oraz potrzebą reagować na coraz bardziej dynamicznie rozwijający się świat.

Najbardziej znaną sekwencyjną metodyką jest Waterfall. Obecnie metodyka Waterfall jest najczęściej wykorzystywana w projektach, które są bardzo dobrze zdefiniowane i nie ulegają zmianie w trakcie realizacji, np. w grach wideo czy projektach budowlanych. Można ją stosować zarówno w dużych przedsięwzięciach, jak i w mniejszych projektach - dla każdego projektu, który od początku ma dobrze zdefiniowane wymagania. Przykładem sukcesu takiego podejścia do realizacji projektu może być misja Apollo 11, celem której było wysłanie pierwszego człowieka na Księżyc. Projekt ten był bardzo dobrze zdefiniowany, miał mierzalny cel i był realny do osiągnięcia w określonym czasie [8].

Agile (czyli "zwinnność") jest to zbiorcze określenie dla metod i praktyk zarządzania projektami, które kładą nacisk na elastyczność, adaptację do zmieniających się wymagań i skupienie na dostarczaniu wartości dla klienta w jak najkrótszym czasie [2][3][5]. Jest to odpowiedź na tradycyjne metody zarządzania projektami, które często były uznawane za zbyt sztywne i nieefektywne w szybko zmieniających się środowiskach, takich jak rozwój oprogramowania.

Podstawowe cechy podejścia Agile:

1. **Iteracyjność i przyrostowość**: Projekty są dzielone na małe części, nazywane iteracjami lub sprintami, które trwają zazwyczaj od dwóch do czterech tygodni. Każda iteracja ma na celu dostarczenie pewnej funkcjonalności lub wartości dla klienta.

2. **Komunikacja**: Regularne spotkania (tzw. stand-upy) pomagają zespołowi porozumieć się, wyznaczyć priorytety i rozwiązać bieżące problemy.

3. **Feedback**: Klient jest stale angażowany w proces tworzenia produktu, dzięki czemu może na bieżąco dostarczać informacji zwrotnych, które pozwalają na dostosowywanie produktu do jego potrzeb.

4. **Autoorganizacja zespołu**: Zespoły Agile są często samodzielne i mają pełne uprawnienia do podejmowania decyzji dotyczących tego, jak najlepiej osiągnąć cel sprintu.

5. **Ciągłe doskonalenie**: Po każdej iteracji zespoły przeprowadzają retrospekcje, podczas których analizują, co poszło dobrze, a co można poprawić.

Ważne jest również zrozumienie, że Agile to nie tylko metodyki (takie jak Scrum czy Kanban), ale również kultura i zestaw wartości. Te wartości zostały zdefiniowane w "Agile Manifesto" i obejmują między innymi:

- Wartość ludzi i interakcji ponad procesy i narzędzia.
- Współpracę z klientem ponad negocjowanie umów.
- Reagowanie na zmiany ponad śledzenie planu.

Mimo że początki Agile są związane głównie z branżą IT i rozwijaniem oprogramowania, zasady te są obecnie stosowane w wielu różnych branżach i kontekstach [6].

Omawiająć tematykę zarządzania projektami, warto też zawsze pamiętać, że nie wszystko kończy się na narzędziach i metodach. Wiele projektów kończy się niepowodzeniem, a jednym z głównych powodów jest brak odpowiedniego przygotowania i planowania. Przykładami takich projektów są:

1. **Budowa Eurotunelu** - początkowo oszacowano, że projekt będzie kosztować około 5 miliardów funtów, ale ostateczny koszt wyniósł prawie 10 miliardów funtów. Znaczenie dokładnego budżetowania i monitorowania kosztów jest tutaj kluczowe.
2. **Festiwal Fyre** - brak odpowiedniego planowania i zarządzania ryzykiem doprowadził do katastrofalnej imprezy, która zakończyła się fiaskiem i wieloma skargami.
3. **Kryzys BlackBerry w 2011 roku**, kiedy usługi firmy na całym świecie przestały działać na trzy dni. Firma została skrytykowana za słabą komunikację z klientami podczas awarii.

Ważnym elementem współczesnego zarządzania projektami jest wykorzystanie narzędzi informatycznych, takich jak oprogramowanie do zarządzania projektami, które umożliwiają prowadzenie projektów na wysokim poziomie i ułatwiają koordynację pracy zespołu. Dodatkowo, analiza danych i wykorzystanie narzędzi Business Intelligence pozwala na wgląd w efektywność projektów oraz umożliwia podejmowanie szybkich i trafnych decyzji [1].

Ważnym elementem współczesnego zarządzania projektami jest również zwrócenie uwagi na aspekty związane z etyką i zrównoważonym rozwojem [1][4]. Zgodność z przepisami i normami, a także zasadami etycznymi i społecznymi, to kluczowe elementy dla długoterminowego sukcesu projektu i organizacji [1].

Źródła:

1. Project Management Institute (PMI) - https://www.pmi.org/
2. Agile Alliance - https://www.agilealliance.org/
3. "Agile Project Management with Scrum" - Ken Schwaber
4. "Effective Project Management: Traditional, Agile, Extreme" - Robert K. Wysocki
5. "The Project Manager's Guide to Mastering Agile" - Charles G. Cobb
6. Waterfall vs Agile - https://www.atlassian.com/agile/project-management/waterfall-vs-agile
7. Waterfall Model a Complete Guide - 2019 Edition - Gerardus Blokdyk
8. How Project Apollo Shaped the Project Management Landscape for any Organization? - https://www.saviom.com/blog/project-apollo-shaped-the-project-management-landscape/

### Systemy zarządzania projektami i ich rola w branży tłumaczeniowej

System zarządzania projektami (Project Management System, PMS) to narzędzie informatyczne, które pozwala na kompleksowe zarządzanie projektem poprzez koordynację pracy zespołu, planowanie zadań, monitorowanie postępów i raportowanie wyników. Często PMS wspierają różne współczesne metody zarządznia projektami, w tym z rodziny Agile. [8][9]

Przykładowe PMS i ich funkcjonalności:

1. **Asana** - Asana jest elastycznym narzędziem do zarządzania projektami, które pozwala na planowanie, śledzenie i komunikację w projekcie. Zawiera listy zadań, harmonogramy, panele i funkcje automatyzacji.
2. **Trello** - Trello bazuje na metodologii Kanban i pozwala użytkownikom tworzyć tablice z kartami reprezentującymi zadania. Jest intuicyjne, wizualne i można je dostosować poprzez różne dodatki.
3. **Jira** - Stworzony głównie dla zespołów programistycznych, Jira oferuje zaawansowane narzędzia do śledzenia błędów i zadań. Często jest używany z Confluence, narzędziem do zarządzania dokumentacją.
4. **Monday** - Monday.com to wizualna platforma zarządzania pracą, która pozwala zespołom planować i śledzić projekty w kolorowych i dostosowywalnych tablicach.
5. **Basecamp** - Basecamp jest narzędziem do zarządzania projektami i komunikacji zespołowej, które oferuje czaty, listy zadań, dokumenty i harmonogramy w jednym miejscu.
6. **Microsoft Project** - Jest to jedno z najbardziej zaawansowanych narzędzi do zarządzania projektami, które oferuje szczegółowe harmonogramowanie, alokację zasobów i analizę postępów.
7. **Smartsheet** - Smartsheet to platforma do zarządzania i automatyzacji pracy, która łączy wygląd arkusza kalkulacyjnego z funkcjami zarządzania projektami.
8. **Wrike** - Wrike to narzędzie do zarządzania pracą z funkcjami takimi jak listy zadań, śledzenie czasu, raportowanie i integracja z innymi narzędziami.
9. **Notion** - Notion to wszechstronne narzędzie, które łączy notatki, bazy danych, tablice Kanban, wikis i kalendarze, pozwalając zespołom na organizację i zarządzanie projektami.
10. **Redmine** - Redmine to otwarte oprogramowanie do zarządzania projektami, które oferuje śledzenie błędów, harmonogramowanie i wsparcie dla wielu projektów.
11. **Jama Connect** - Jama Connect to narzędzie do zarządzania wymaganiami, które pozwala zespołom na śledzenie wymagań, testowanie i zarządzanie zmianami.

Systemy PMS zwiększają efektywność zarządzania projektem poprzez łatwe planowanie zadań, monitorowanie postępów oraz komunikację w zespole. Umożliwiają oni również klarowne określenie celów, ocenę ryzyka i identyfikację problemów. Dzięki nim projekt staje się bardziej transparentny, ułatwiając wymianę informacji wśród członków zespołu oraz komunikację z interesariuszami zewnętrznymi. Systemy te przyczyniają się do oszczędności czasu, adaptacji do zmieniających się wymagań oraz korzystają z narzędzi analitycznych i sztucznej inteligencji. Służą zarządzaniu różnymi projektami, takimi jak oprogramowanie, budowa czy kampanie marketingowe, pomagając dostarczyć je na czas i w ramach budżetu[8][10][11][12].

Kontynuując temat, co raz więcej firm decyduje się na tworzenie takich narzędzi od zera, co pozwoli im dostać system w pełni odpowiadający potrzebom organizacji. Jednakże, systemy PMS nie są tylko dla tradycyjnych sektorów biznesu. Biura tłumaczeń również odnajdują w nich wielkie korzyści.

Biura tłumaczeń zajmują się przetwarzaniem ogromnej ilości informacji, co może stanowić wyzwanie dla zarządzania projektami tłumaczeniowymi. W celu poprawy jakości zarządzania takimi projektami i zwiększenia efektywności pracy biuro tłumaczeń powinno rozważyć użycie specjalistycznego narzędzia PMS.

Według raportu opublikowanego na stronie Language Industry Hires [14], zastosowanie PMS pozwala na lepsze zarządzanie projektami tłumaczeniowymi, ponieważ umożliwia łatwe przypisywanie zadań, śledzenie postępów prac i dzielenie się plikami między członkami zespołu. PMS ułatwia także współpracę w zespole, co przyczynia się do zwiększenia skuteczności i efektywności projektów tłumaczeniowych.

Innym istotnym aspektem jest możliwość analizowania danych, które pozwala na dokładniejsze monitorowanie postępów projektów i dokonywanie zmian w planie projektowym. Według badania przeprowadzonego przez Common Sense Advisory, firmy, które korzystają z narzędzi analitycznych w procesie tłumaczenia, są bardziej skuteczne i efektywne. Dzięki analizie danych biuro tłumaczeń może zidentyfikować słabe punkty w procesie tłumaczenia i wprowadzić odpowiednie zmiany, aby poprawić jego jakość i zwiększyć zyski.

Podsumowując, specjalistyczne narzędzia PMS mogą przynieść wiele korzyści dla biur tłumaczeń. Pozwalają one na usprawnienie zarządzania projektami, ułatwienie współpracy w zespole, zwiększenie efektywności projektów, poprawę jakości produktów końcowych i zwiększenie konkurencyjności na rynku. W związku z tym warto rozważyć zastosowanie takiego narzędzia w codziennej pracy biura tłumaczeń.

Warto podkreślić, że specjalistyczne narzędzie PMS jest dostosowane do potrzeb biur tłumaczeń, a nie jest to jedynie uniwersalne narzędzie do zarządzania projektami. Istnieje wiele dostępnych na rynku rozwiązań, które oferują różne funkcjonalności i opcje, co pozwala na wybór narzędzia, które najlepiej odpowiada indywidualnym potrzebom i wymaganiom biura tłumaczeń.

Źródła:

9. Project Management Institute (PMI) - https://www.pmi.org/
10. "Project Management Systems: A Technology Review" - Alok Mishra and Neeraj Mishra, International Journal of Computer Applications Technology and Research, Volume 5– Issue 1, 2016
11. "The Benefits of Project Management Software" - Derek Huether, ProjectManager.com - https://www.projectmanager.com/blog/the-benefits-of-project-management-software
12. "The Advantages of Project Management Software" - Workzone - https://www.workzone.com/blog/the-advantages-of-project-management-software/
13. "Why Use Project Management Software?" - Zoho - https://www.zoho.com/projects/blog/
14. "5 Reasons Why Your Translation Agency Needs Project Management Software" - Language Industry Hires - https://www.languageindustryhires.com/single-post/2017/03/13/5-Reasons-Why-Your-Translation-Agency-Needs-Project-Management-Software [dostęp: 21.02.2023]
15. "Translation Management Technology for LSPs" - Common Sense Advisory - https://csa-research.com/Insights/ArticleID/46/Translation-Management-Technology-for-LSPs [dostęp: 21.02.2023]

## Koncepcja aplikacji

### Geneza projektu i inspiracje

Wraz z rosnącym zapotrzebowaniem na profesjonalne usługi tłumaczeniowe dostrzegłem potrzebę stworzenia specjalistycznego narzędzia do zarządzania unikalnymi wyzwaniami związanymi z projektami tłumaczeniowymi. Tradycyjne narzędzia do zarządzania projektami często nie radzą sobie z obsługą wielu języków, zarządzaniem wieloma tłumaczami i obsługą różnych formatów plików. Dlatego też postanowino stworzyć specjalistyczny system zarządzania projektami tłumaczeniowymi.

Zadaniem systemu jest usprawnienie przepływu pracy nad tłumaczeniami, poprawienie ich jakości oraz ułatwienie komunikacji i współpracy między kierownikami projektów, tłumaczami i innymi członkami zespołu. Zawiera on również funkcje takie jak zapewnienie jakości, zarządzanie terminologią oraz integrację z tłumaczeniami maszynowymi, co pozwala zapewnić najwyższą jakość tłumaczeń.

Dodatkowo, system zapewni ulepszone zarządzanie zasobami, pozwalając kierownikom na bardziej efektywne zarządzanie czasem i budżetem, a także zautomatyzowane raporty i analizy umożliwiające śledzenie postępów projektu, alokacji zasobów i budżetu.

Podsumowując, poprzez stworzenie specjalistycznego systemu zarządzania projektami tłumaczeniowymi, dążymy do poprawy wydajności, jakości i ogólnego sukcesu projektów tłumaczeniowych, pomagając firmom i organizacjom w skutecznej komunikacji z klientami, partnerami i innymi interesariuszami w różnych językach.

### Założenia i cele projektu

Cele i założenia koncepcji aplikacji systemu zarządzania projektami tłumaczeniowymi obejmują:

1. **Usprawnienie przepływu pracy tłumaczeniowej**: Poprzez zapewnienie scentralizowanej platformy do zarządzania projektami tłumaczeniowymi, aplikacja pomoże kierownikom projektów i tłumaczom pracować wydajniej i efektywniej.
2. **Ułatwienie komunikacji i współpracy**: Aplikacja zapewni kierownikom projektów i tłumaczom narzędzia do komunikacji i współpracy nad projektami, co pomoże zwiększyć efektywność procesu tłumaczenia.
3. **Usprawnienie zarządzania zasobami**: Poprzez dostarczenie narzędzi do śledzenia i raportowania czasu i budżetu, aplikacja pomoże kierownikom projektów w bardziej efektywnym zarządzaniu zasobami.
4. **Zapewnienie widoczności i kontroli**: Aplikacja zapewni zautomatyzowane raportowanie i analitykę, aby pomóc kierownikom projektów w śledzeniu postępów projektu, alokacji zasobów i budżetu, co pomoże poprawić widoczność i kontrolę nad projektem.
5. **Zapewnienie przyjazności dla użytkownika**: aplikacja będzie miała łatwy w użyciu interfejs, dzięki czemu będzie dostępna dla użytkowników o każdym poziomie umiejętności.
6. **Zapewnienie bezpeiczeństwa**: Aplikacja będzie posiadała solidne zabezpieczenia chroniące dane projektu oraz dane użytkowników.
7. **Aspekty techniczne**: Aplikacja będzie elastyczna i skalowalna, aby dostosować się do rosnących potrzeb i wymagań klienta.

Podsumowując, cele i założenia koncepcji aplikacji systemu zarządzania projektami tłumaczeniowymi to usprawnienie i poprawa procesu tłumaczenia poprzez zapewnienie scentralizowanej platformy do zarządzania projektami tłumaczeniowymi, poprawa jakości tłumaczeń, ułatwienie komunikacji i współpracy, poprawa zarządzania zasobami, zapewnienie widoczności i kontroli nad projektem, bycie przyjaznym dla użytkownika, bycie bezpiecznym i możliwość dostosowania do potrzeb klientów.

### Funkcjonalności aplikacji

Aplikacja będzie zawierała następujące funkcje:

1. **Zarządzanie projektami**: Aplikacja zapewni narzędzia do zarządzania projektami tłumaczeniowymi, takie jak tworzenie i edytowanie projektów, przydzielanie zadań oraz śledzenie postępów projektu. Jest to podstawowa funkcja aplikacji, która pomoże usprawnić przepływ pracy tłumaczeniowej. Dla każdego projektu mozna będzie zdefiniować nazwę, opis, szczegóły realizacji, powiązanie z klientem, języki, terminy, oraz budżet. Powstanie też funkcjonalność zarządzania zespołem projektowym oraz centralne repozytorium plików projektu.
2. **Komunikacja i współpraca**: W celach komunikacji w ramach każdego projektu powstanie funkcjonalność tworzenia wątków komunikacyjnych, które będą zawierały temat wątku, treść, oraz możliwość zostawienia komentarzy i reakcji. Każdy wątek będzie miał możliwość zamrożenia, zamknięcia i ponownego otwarcia, co pozwoli na lepszą organizację komunikacji.
3. **Zarządzanie zasobami**: Aplikacja zapewni narzędzia do śledzenia i raportowania kosztów i czasu, poświęconego na realizacje projektu, co pomoże kierownikom projektów skuteczniej zarządzać zasobami.
4. **Raportowanie i analityka**: Aplikacja zapewni widoki siątki z rozbudowanymi opcjami filtrowania i sortowania, dzięki czemu będzie można łatwo znaleźć szukane dane. Powstanie również funkcjonalność eksportu danych z widoków siatek, tak aby można było je wykorzystać w innych aplikacjach w celach raportowania i analizy, takich jak Excel czy Power BI.
5. **Zarządzanie użytkownikami**: Aplikacja zapewni narzędzia do zarządzania użytkownikami, takie jak tworzenie i edycja użytkowników, przypisywanie ról i zarządzanie uprawnieniami.
6. **Bezpieczeństwo**: Aplikacja zapewni mechanizmy autentykacji i autoryzacji, takie jak logowanie, wylogowanie, resetowanie hasła, zmiana adresu e-mail, oraz resetowanie adresu e-mail. System autentykacji i autoryzacji zapewni konfigurowalność, tak aby można było włączyć lub wyłączyć niektóre z tych mechanizmów.
7. **Aspekty techniczne**: Aplikacja zapewni monitorowalność w postaci rozbudowanego systemu logowania i narzędzi analizy logów, co pomoże w szybkim rozwiązywaniu problemów.

## Projekt aplikacji
 
### Przypadki użycia i historyjki użytkownika

#### Jako użytkownik, chcę:

1. Zalogować się do systemu, aby móc zacząć korzystać z aplikacji.
2. Wylogować się z systemu, dzięki czemu mogę skończyć pracę z aplikacją.
3. Zmienić hasło, dzięki czemu będę mógł zachować bezpieczeństwo swojego konta.
4. Zresetować hasło, dzięki czemu będę mógł odzyskać dostęp do swojego konta, jeśli je zapomnę.
5. Zmienić adres e-mail, tak aby moje konto było bezpieczne.
6. Zresetować adresu e-mail, tak aby odzyskać dostęp do konta, jeśli go zapomnę.

#### Jako administrator, chcę:

1. Pełny dostęp do aplikacji, aby móc zarządzać wszystkimi jej funkcjonalnościami.
2. Dodać nowego użytkownika, aby mógł rozpocząć pracę z aplikacją.
3. Edytować istniejącego użytkownika, aby móc zaktualizować jego dane.
4. Mieć mozliwość zarządzania dostępem użytkowników, by móc kontrolować jego uprawnienia.

#### Jako kierownik projektu, chcę:

1. Mieć widok siatki dostępnych projektów z rozbudowanymi opcjami filtrowania i sortowania, dzięki czemu mogę łatwo znaleźć szukany projekt.
2. Wyeskporotwać dane z widoku siatki, tak aby móc je wykorzystać w innych aplikacjach w celach raportowania i analizy.
3. Stworzyć nowy projekt, aby móc rozpocząć nad nim pracę.
4. Mieć pełną kontrolę nad cyklem życia projektu którym zarządzam, aby móc śledzić jego postępy i zidentyfikować problemy.
5. Zarządzać zespołem projektowym, aby móc kontrolować dostęp do projektu dla poszczególnych użytkowników oraz wiedzieć, kto jaką rolę pełni w projekcie.
6. Podzielić projekt na zadania, aby móc odpowiednio podzielić pracę między członków zespołu.
7. Prypisać zadania do członków zespołu, aby wiedzieć, kto jest odpowiedzialny za wykonanie danego zadania.
8. Monitorować postępy w realizacji zadań, aby móc śledzić postępy projektu.
9. Zarzadzać plikami projektu, aby móc łatwo udostępniać je innym członkom zespołu.
10. Śledzić koszty realizacji projektu, aby móc kontrolować budżet.
11. Komunikować z zespołem projektowym, aby wszyscy członkowie zespołu mogli być na bieżąco z postępami projektu.
12. Mieć widoki siatek zadań, kosztów realizacji, komunikacji i plików projektu, dzięki czemu mogę łatwo znaleźć szukane dane.
13. Wyeskporotwać dane z widoków siatek zadań i kosztów realizacji, tak aby móc je wykorzystać w innych aplikacjach w celach raportowania i analizy.
14. Zarządzać listą klientów, aby móc dodawać nowych klientów i edytować istniejących.

#### Jako tłumacz, redaktor, korektor, ekspert merytoryczny czy edytor chcę:

1. Mieć widok siatki projektów, do których jestem przypisany, dzięki czemu mogę łatwo znaleźć projekt, nad którym pracuję.
2. Mieć widok siatki zadań, do których jestem przypisany, dzięki czemu mogę łatwo znaleźć zadanie, nad którym pracuję.
3. Kontolować cykl życia zadania, nad którym pracuję, aby móc odpowiednio zarządzać jego postępami.
4. Mieć widok siatki plików projektu, do którego jestem przypisany, dzięki czemu mogę łatwo znaleźć plik, nad którym pracuję.
5. Pobrać pliki niezbędne do pracy, aby móc rozpocząć pracę nad zadaniem.
6. Wgrać pliki z tłumaczeniami, aby móc zakończyć pracę nad zadaniem.
7. Brać udział w komunikacji zespołu projektowego, aby wszyscy członkowie zespołu mogli być na bieżąco z postępami projektu.
8. Zaraportować czas poświęcony na realizację zadania, aby móc śledzić postępy projektu.

#### Jako obserwator, chcę:

1. Mieć widok siatki projektów, do których mam dostęp, dzięki czemu mogę łatwo znaleźć projekt, który mnie interesuje.
2. Mieć pełny wgląd w projekty, do których mam dostęp, aby móc śledzić ich postępy.
3. Brać udział w komunikacji zespołu projektowego, aby wszyscy członkowie zespołu mogli być na bieżąco z postępami projektu.

#### Jako inżynier wsparcia, chcę:

1. Posiadać widok siatki logów z rozbudowanymi opcjami filtrowania i sortowania, dzięki czemu mogę łatwo znaleźć log, którego szukam.
2. Mieć możliwość eksportowania danych z widoku siatki, tak aby móc je wykorzystać w innych aplikacjach.
3. Mieć możliwość monitorowania wydajności aplikacji, dzięki czemu mogę się upewnić, że działa ona prawidłowo.

### Diagram klas

### Diagramy stanów

### Wzorce i zasady projektowe

#### Filozofia projektowania

* Nie wymyślaj koła na nowo. Użyj istniejących bibliotek i frameworków, gdy tylko jest to możliwe. Staraj się pisać jak najmniej kodu.
* Zachowaj prostotę. Nie komplikuj zbytnio rzeczy.
* Zachowaj czystość. Nie pisz niechlujnego kodu.
* Zachowaj spójność. Nie pisz kodu w różnych stylach. 
* Dbaj o bezpieczeństwo. Nie zostawiaj dziur bezpieczeństwa w aplikacji. Zawsze używaj najnowszych wersji bibliotek i frameworków. Zastanów się dziesięć razy zanim dodasz backdoora.
* Zapewnij testowalność. Nie pisz kodu, który jest trudny do przetestowania. Używaj czystych funkcji, kiedy tylko to możliwe. Ogranicz mutacje. Nie używaj zmiennych globalnych.
* Zapewnij obserwowalność. Nie pisz kodu, który jest trudny do debugowania. Używaj logowania. Używaj śledzenia. Używaj metryk. Używaj profilowania.
* Korzystaj z istniejących standardów. Nie wymyślaj nowych.
* Używaj znanych i sprawdzonych praktyk.

#### Domain-driven design (DDD)

Domain Driven Design (DDD) to podejście do projektowania oprogramowania, które skupia się na modelowaniu biznesowych dziedzin (domen) poprzez dokładne zrozumienie ich reguł, procesów i relacji między nimi. W DDD, dziedziny są uważane za centralny punkt projektowania i są reprezentowane za pomocą obiektów w kodzie źródłowym, które odzwierciedlają ich charakterystyczne cechy [1].

Jednym z głównych celów DDD jest rozwiązanie problemu tzw. "języka ogólnego" (ang. ubiquitous language) w projektach oprogramowania. Język ogólny to zbiór terminów i pojęć używanych w dziedzinie, które powinny być używane konsekwentnie przez wszystkich uczestników projektu - zarówno w biznesie, jak i w IT [2]. DDD zachęca do budowania modelu dziedziny, który odzwierciedla język ogólny i umożliwia lepszą komunikację między różnymi zespołami i ekspertami dziedzinowymi.

DDD składa się z wielu konceptów, takich jak agregaty, encje, wartości, fabryki, repozytoria, usługi domenowe i wiele innych. Każdy z tych konceptów ma swoje unikalne cechy i rolę w modelowaniu dziedziny, ale łączą się one w całość, która odzwierciedla rzeczywistość biznesową [3].

DDD zyskało popularność wśród programistów i architektów oprogramowania, którzy chcą lepiej zrozumieć dziedziny biznesowe i tworzyć oprogramowanie, które dokładnie je odzwierciedla. DDD może pomóc w tworzeniu bardziej elastycznych, skalowalnych i łatwych do utrzymania systemów, które są bardziej dostosowane do rzeczywistych potrzeb biznesowych [4].

W sumie, DDD to podejście projektowania oprogramowania, które koncentruje się na modelowaniu biznesowych dziedzin i wykorzystuje język ogólny, aby zapewnić lepszą komunikację i zrozumienie między różnymi uczestnikami projektu. DDD składa się z wielu konceptów, które są ze sobą powiązane i tworzą spójny model dziedziny. DDD może pomóc w tworzeniu bardziej elastycznych i skalowalnych systemów, które są dokładnie dopasowane do potrzeb biznesowych.

1. Evans, E. (2004). Domain-driven design: Tackling complexity in the heart of software. Addison-Wesley Professional.
2. Fowler, M. (2013). Domain-specific languages. Addison-Wesley.
3. Vernon, V. (2011). Implementing Domain-Driven Design. Addison-Wesley Professional.
4. Ghosh, S., & Misra, S. C. (2014). A survey of domain-driven design in current practice.

#### Architektura heksagonalna, czyli wzorzec Porty i adaptery (HA)

Architektura Heksagonalna, znana również jako Ports and Adapters Architecture, to wzorzec projektowy, który staje się coraz bardziej popularny w świecie tworzenia oprogramowania. HA skupia się na rozdzieleniu warstwy aplikacji od logiki biznesowej, co pozwala na zmniejszenie zależności między nimi i ułatwia testowanie [1].

Architektura Heksagonalna opiera się na trzech głównych elementach: portach, adapterach i rdzeniu. Porty to interfejsy, które określają sposób komunikacji między warstwą logiki biznesowej a resztą systemu. Są to punkty wejścia i wyjścia do rdzenia systemu, które zapewniają elastyczność i łatwość wprowadzania zmian. Adaptery to implementacje portów, które pozwalają na integrację warstwy logiki biznesowej z resztą systemu [2].

Rdzeń to centrum systemu, gdzie znajduje się cała logika biznesowa. To tutaj są realizowane wszystkie operacje związane z funkcjonalnościami systemu. Dzięki rozdzieleniu warstwy biznesowej od reszty systemu, HA umożliwia łatwe testowanie i rozwijanie aplikacji [3]. HA jest szczególnie przydatna w przypadku dużych i skomplikowanych systemów, gdzie łatwe wprowadzanie zmian w logice biznesowej jest kluczowe dla utrzymania elastyczności systemu.

Przykłady zastosowania architektury Heksagonalnej można znaleźć w wielu aplikacjach, w tym w systemach bankowych, systemach e-commerce i w wielu innych projektach biznesowych, gdzie kluczowe jest zapewnienie elastyczności i łatwości wprowadzania zmian w logice biznesowej [1]. Dzięki temu podejściu programiści mogą skupić się na rozwoju warstwy biznesowej bez konieczności przejmowania się resztą systemu.

Wniosek? Architektura Heksagonalna to narzędzie, które pozwala na łatwe wprowadzanie zmian w logice biznesowej bez wpływu na pozostałe części systemu. Dzięki temu programiści mogą skupić się na rozwoju warstwy biznesowej, co przekłada się na elastyczność i łatwość wprowadzania zmian w systemie [2].

1. A. Włodarczyk, "Hexagonal Architecture w praktyce", https://bulldogjob.pl/articles/806-hexagonal-architecture-w-praktyce, [dostęp: 21.02.2023].
2. A. Roca, "Hexagonal Architecture: Three principles and an implementation example", https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Hexagonal-Architecture-Three-principles-and-an-implementation-example, [dostęp: 21.02.2023].
3. M. Verburg, "Hexagonal Architecture - Practical Example in Java", https://www.baeldung.com/hexagonal-architecture-ddd-spring, [dostęp: 21.02.2023].

#### Wstrzykiwanie zależności (DI)

Wstrzykiwanie zależności (Dependency Injection, DI) to wzorzec projektowy, który umożliwia oddzielenie tworzenia obiektów od ich używania. Zamiast tworzenia obiektów wewnątrz innych obiektów, co prowadzi do silnego sprzęgnięcia między nimi, obiekty są wstrzykiwane z zewnątrz.

W praktyce oznacza to, że obiekt nie tworzy innych obiektów, których potrzebuje, ale otrzymuje je z zewnątrz, poprzez konstruktor, metody lub właściwości [1]. Dzięki temu obiekt jest bardziej elastyczny i łatwiej go testować, ponieważ można go testować oddzielnie od obiektów, z którymi współpracuje.

DI może być realizowane na wiele sposobów, takich jak konstruktor, metoda lub właściwość. W każdym przypadku wstrzykiwane są obiekty, które są potrzebne do działania klasy, a nie są one tworzone wewnątrz klasy. Dzięki temu łatwiej jest zmieniać obiekty w klasie, ponieważ nie ma potrzeby zmiany kodu klasy, a jedynie podmienienia wstrzykiwanych obiektów [2].

DI jest szczególnie przydatne w przypadku dużych projektów, gdzie liczba klas i zależności między nimi może być bardzo duża. Wtedy DI umożliwia lepsze zarządzanie zależnościami i pozwala na łatwiejsze testowanie i rozwijanie aplikacji.

Warto zauważyć, że DI nie jest jedynym sposobem na uniknięcie silnego sprzęgnięcia między klasami. Innym podejściem może być użycie wzorca fabryki (Factory), który umożliwia tworzenie obiektów w jednym miejscu, a następnie ich przekazywanie do innych klas. W porównaniu z DI jednak, wzorzec fabryki jest bardziej skomplikowany i mniej elastyczny [3].

Źródła:

1. M. Fowler, "Inversion of Control Containers and the Dependency Injection pattern", https://martinfowler.com/articles/injection.html, [dostęp: 21.02.2023].
2. S. Freeman, S. Robson, "Head First Design Patterns", O'Reilly Media, 2004.
3. E. Gamma, R. Helm, R. Johnson, J. Vlissides, "Design Patterns: Elements of Reusable Object-Oriented Software", Addison-Wesley, 1994.

#### Logowanie i monitorowanie

Logging i monitoring to ważne aspekty każdej aplikacji. Logging pozwala na zbieranie informacji o tym, co dzieje się w aplikacji, a monitoring na na bieżąco monitorować działanie systemu i reagować na problemy. Odpowiednio skonfigurowany logging i monitoring to kluczowe elementy w utrzymaniu jakości i niezawodności aplikacji.

Logging to proces zapisywania informacji o wydarzeniach zachodzących w aplikacji [1]. Zazwyczaj logowanie skupia się na tym, co może pomóc w zrozumieniu problemów związanych z działaniem aplikacji. Zapisywane są informacje na temat błędów, ostrzeżeń, informacji diagnostycznych, a także o żądaniach i odpowiedziach HTTP. W aplikacjach w chmurze, logowanie jest szczególnie ważne, ponieważ pozwala na śledzenie błędów w rozproszonym systemie.

Monitoring to proces zbierania i analizowania informacji na temat działania aplikacji, infrastruktury i zasobów sieciowych [2]. Narzędzia do monitorowania pozwalają na śledzenie metryk związanych z wydajnością, zużyciem pamięci, zużyciem procesora, obciążeniem sieci i wieloma innymi. Dzięki temu administratorzy systemów mogą na bieżąco monitorować system i podejmować odpowiednie działania w celu zapewnienia jego niezawodności i wydajności.

Warto zwrócić uwagę na to, że odpowiednio skonfigurowany logging i monitoring to kluczowe elementy w utrzymaniu jakości i niezawodności aplikacji. Dobrze zaprojektowane mechanizmy logowania pomagają w identyfikacji problemów, a odpowiednio skonfigurowane narzędzia do monitorowania pozwalają na reagowanie na problemy zanim wpłyną one na działanie aplikacji i użytkowników.

Źródła:

1. M. Shema, "Logging Basics", https://www.loggly.com/ultimate-guide/java-logging-basics/, [dostęp: 21.02.2023].
2. A. Otocki, "A beginner's guide to monitoring", https://www.datadoghq.com/blog/monitoring-101-a-beginners-guide/, [dostęp: 21.02.2023].

#### Kombinacja DDD, HA, DI i logowania/monitorowania

Kombinacja Domain-Driven Design (DDD), Architektury Heksagonalnej (HA), Wstrzykiwania Zależności (DI) i Logging/Monitoringu to podejście, które stało się bardzo popularne w dzisiejszych czasach. Zastosowanie DDD pomaga w tworzeniu lepszego modelu biznesowego, a także w identyfikacji kluczowych koncepcji biznesowych, które są potrzebne w trakcie tworzenia aplikacji [1]. HA pozwala na oddzielenie logiki biznesowej od technologii, co umożliwia łatwe wprowadzanie zmian bez konieczności wprowadzania zmian w całej aplikacji [2]. DI pozwala na elastyczne zarządzanie zależnościami między modułami, umożliwiając łatwe testowanie i łatwe wprowadzanie zmian [3]. Natomiast Logging/Monitoring pomaga w monitorowaniu i diagnostyce działania aplikacji, co pozwala na wykrywanie błędów w trakcie działania aplikacji, a także umożliwia ich szybkie usuwanie.

Kombinacja tych podejść jest szczególnie skuteczna w przypadku projektów, które wymagają dużej skalowalności oraz elastyczności. Zastosowanie tych narzędzi pomaga w utrzymaniu czystej i spójnej architektury aplikacji, ułatwia testowanie i diagnostykę, co z kolei pomaga w szybszym wdrażaniu zmian w trakcie rozwoju aplikacji. DI jest szczególnie ważne w tym procesie, ponieważ pozwala na łatwe zmienianie zależności między modułami bez konieczności wprowadzania zmian w kodzie, co może znacznie usprawnić proces tworzenia i utrzymania aplikacji.

Jednym z głównych wyzwań, które można napotkać przy korzystaniu z tych narzędzi, jest potrzeba wiedzy i doświadczenia w dziedzinie programowania. Każde z tych podejść ma swoje własne zasady i praktyki najlepszych praktyk, co oznacza, że wymagają od programistów dużej wiedzy i doświadczenia. Jednak zastosowanie tych narzędzi jest bardzo korzystne dla projektów o dużej skali i złożoności [4].

Podsumowując, zastosowanie DDD, HA, DI i Logging/Monitoringu jest bardzo korzystne w projektowaniu i tworzeniu aplikacji. Kombinacja tych podejść pozwala na utrzymanie czystej i spójnej architektury aplikacji, ułatwia testowanie i diagnostykę, a także pomaga w szybszym wdrażaniu zmian. Jednakże wymaga od programistów dużej wiedzy i doświadczenia w dziedzinie programowania.

1. Evans, Eric. "Domain-driven design: tackling complexity in the heart of software." Pearson Education, 2004.
2. "Hexagonal architecture." Port on Patterns, 2013, https://www.innoq.com/en/portals/hexagonal-architecture/.
3. Freeman, Adam, and James Turnbull. "Building microservices: designing fine-grained systems." O'Reilly Media, Inc., 2015.
4. Szewczyk, Paweł. "Combining Domain-Driven Design and Hexagonal Architecture to develop robust and maintainable web applications." Procedia Computer Science 126 (2018): 1191-1200.

#### Architektura wielowarstwowa

Architektura wielowarstwowa, znana również jako architektura trójwarstwowa lub architektura n-warstwowa, to podejście do tworzenia aplikacji, w którym aplikacja jest podzielona na kilka warstw lub poziomów [1]. Każda z tych warstw wykonuje określone zadania, a ich komunikacja odbywa się za pomocą ściśle określonych protokołów i interfejsów. Najczęściej w architekturze wielowarstwowej wyróżnia się warstwy prezentacji, logiki biznesowej i warstwę danych, ale nie jest to konieczne. Architektura wielowarstwowa jest szczególnie przydatna w przypadku aplikacji, które wymagają dużej skalowalności i elastyczności, ponieważ pozwala na łatwe dodawanie nowych warstw, a także na łatwe usuwanie istniejących [2]. 

Architektura wielowarstwowa jest bardzo popularna w projektowaniu aplikacji, ponieważ pozwala na łatwe skalowanie aplikacji oraz zmniejszenie skomplikowania kodu. Pozwala również na łatwe testowanie każdej z warstw niezależnie od pozostałych, co ułatwia proces testowania i utrzymania aplikacji [3].

Źródła:

1. Martin Fowler, Patterns of Enterprise Application Architecture, Addison-Wesley, 2002.
2. Sandro Mancuso, The Software Craftsman: Professionalism, Pragmatism, Pride, Prentice Hall, 2014.
3. Eric Evans, Domain-Driven Design: Tackling Complexity in the Heart of Software, Addison-Wesley Professional, 2003.


## Stos technologiczny

### Postanowienia ogólne w wyborze technologii

Wybierając stos technologiczny dla systemu organizacji pracy w biurze tłumaczeń, istnieje wiele ogólnych postanowień, które warto wziąć pod uwagę. Stos technologiczny to zestaw narzędzi, frameworków, języków programowania i infrastruktury, które zostaną wykorzystane do budowy i zarządzania systemem. Oto kilka kluczowych aspektów, które postanowiono rozważyć przy wyborze stosu technologicznego:

1. **Cel i wymagania systemu**: Jakie funkcje i możliwości ma zapewnić system? Jakie problemy ma rozwiązywać? To pomoże w określeniu, jakie technologie najlepiej spełnią te cele.

2. **Skalowalność**: Biuro tłumaczeń może rosnąć, więc system musi być w stanie obsłużyć większą liczbę użytkowników i danych w przyszłości.

3. **Bezpieczeństwo**: Bezpieczeństwo jest kluczowym aspektem w biurze tłumaczeń, gdzie dane klientów mogą być poufne. Wybierz technologie, które zapewnią odpowiednie mechanizmy ochrony danych, uwzględniając kwestie takie jak szyfrowanie i autoryzacja.

4. **Integracje**: Wybrane technologie powinne pozwalać na łatwe integrowanie się z innymi narzędziami i systemami, które biuro tłumaczeń już używa, na przykład z narzędziami do zarządzania projektami, systemami CRM czy narzędziami do tłumaczeń.

5. **Wspieranie języków**: Specyfika pracy biura tłumaczeń często ma za sobą obsługę wielu języków, ważne jest, aby stos technologiczny obsługiwał różne zestawy znaków i mógł być dostosowany do specyfiki różnych języków.

6. **Łatwość utrzymania i rozwoju**: Należy wybierać technologie, które są stosunkowo łatwe do utrzymania i rozwijania. To pomoże zminimalizować koszty eksploatacji i zapewnić, że system będzie gotowy na przyszłe zmiany i ulepszenia.

7. **Wsparcie społeczności i dokumentacja**: Ważne jest też sprawdzić, czy wybrane technologie cieszą się wsparciem społeczności programistycznej, co ułatwi rozwiązywanie problemów i znajdowanie odpowiedzi na pytania. Również dostępność do dobrej dokumentacji jest kluczowa. W przyszłości, wybór popularnych i lubianych technologii może ułatwić znalezienie nowych pracowników do zespołu utrzymania i rozwoju systemu.

8. **Koszty**: Koszty są istotnym czynnikiem. Każde biuro tłumaczeń ma inne możliwości finansowe, ale wszystkie chcą zapewnić że koszt utrzymania i rozwoju systemu będzie jak najniższy.

9. **Zgodność z przepisami prawno-regulacyjnymi**: Jeśli biuro tłumaczeń obsługuje tłumaczenia o charakterze prawnym, medycznym lub innym specjalistycznym, należy upewnić się, że wybrane technologie pomogą w spełnieniu wymogów prawnych i regulacyjnych.

Przed dokonaniem wyboru stosu technologicznego, zalecam przeprowadzenie dokładnej analizy i konsultację z profesjonalistami ds. IT lub inżynierami oprogramowania. To pomoże uniknąć potencjalnych problemów i dostosować technologie do konkretnych potrzeb biura tłumaczeń.

Żródła:

1. https://www.softermii.com/blog/10-tips-in-choosing-the-best-tech-stack-for-your-web-application

### Interfejs użytkownika

Interfejs użytkownika (UI), znany również jako interfejs graficzny użytkownika (GUI), to część oprogramowania, która umożliwia interakcję między użytkownikiem a programem lub systemem komputerowym. Jest to to, co widzi i z czym pracuje użytkownik, w tym wszystkie elementy, takie jak przyciski, pola tekstowe, menu, ikony itp., które pozwalają użytkownikowi nawigować po aplikacji lub systemie, wykonywać operacje i korzystać z jego funkcji.

Biorąc pod uwagę zalożenia projektowe systemu organizacji pracy biura tłumaczeń, postanoiwiono, że interfejs użytkownika powinien być aplikacją webową. Aplikacje webowe posiadają wiele zalet, które mogą sprawić, że będą idealne do tego celu, takich jak:

1. **Dostępność z dowolnego miejsca i urządzenia**: Aplikacje webowe są dostępne za pośrednictwem przeglądarek internetowych, co oznacza, że użytkownicy mogą korzystać z systemu z dowolnego miejsca i na różnych urządzeniach, takich jak komputery, tablety czy smartfony. To szczególnie przydatne w organizacji pracy biura tłumaczeń, która może wymagać mobilności i zdalnego dostępu.
2. **Łatwa aktualizacja i utrzymanie**: Aktualizacja aplikacji webowej może być zarządzana centralnie przez zespół IT, co ułatwia wprowadzanie poprawek i dodawanie nowych funkcji. Nie ma potrzeby instalowania aktualizacji na każdym urządzeniu użytkownika.
3. **Skalowalność**: Aplikacje webowe mogą być łatwo skalowane, aby obsługiwać zarówno małe biura tłumaczeń, jak i duże przedsiębiorstwa. Można dostosować zasoby serwerowe do bieżących potrzeb.
4. **Bezpieczeństwo**: Właściciele biura tłumaczeń mogą zadbać o odpowiednie zabezpieczenia aplikacji webowej, takie jak szyfrowanie danych, autoryzacja i uwierzytelnianie, co jest kluczowe w przypadku pracy z poufnymi informacjami.

Po wyborzę aplikacji webowej jako interfejsu użytkownika, następnym krokiem jest wybór technologii, które zostaną wykorzystane do stworzenia interfejsu użytkownika. Wspominając o przyjętych wyżej zasadach w wyborze technologii, zdecydowano się na następujące technologie do stworzenia interfejsu użytkownika systemu organizacji pracy biura tłumaczeń:

1. **React**: React to popularna biblioteka JavaScript do tworzenia interaktywnych interfejsów użytkownika. Jest rozwijana przez korporację Meta i jest szeroko wykorzystywana w branży. React pozwala na tworzenie komponentów interfejsu, które są łatwe w zarządzaniu i ponownym użyciu, co jest szczególnie przydatne przy projektowaniu skomplikowanych interfejsów. Należy też zwrócić uwagę na fakt, że React jest biblioteką, a nie frameworkiem, i pozostawia wiele innych aspektów tworzenia aplikacji, takich jak zarządzanie stanem, zarządzanie zależnościami, routing itp., do wyboru programisty. Mając to na uwadzę postanowiono dodać do projektu różne dodatkowe narzędzia, o których bardziej szczegółowo poniżej w sekcji [Instalacja dodatkowych bibliotek](#instalacja-dodatkowych-bibliotek). 
2. **Język Typescript**: Typescript to język programowania, który jest rozszerzeniem Javascript. Jest on kompilowany do Javascript, co oznacza, że można go używać w dowolnym środowisku, w którym używany jest Javascript. Jednak Typescript dodaje wiele funkcji, takich jak typowanie statyczne, interfejsy, klasy, moduły i wiele innych, które mogą pomóc w tworzeniu bardziej wydajnego i bezpiecznego kodu, eliminując wiele błędów w trakcie kompilacji - takich jak znany "undefined is not a function".
3. **Material Design**: Material Design jest metodologią projektowania stworzoną przez Google. Jest to zestaw zasad, wytycznych i komponentów interfejsu użytkownika, które pomagają projektantom i deweloperom tworzyć spójne, estetyczne i intuicyjne aplikacje i strony internetowe. Material Design skupia się na przyjaznym dla użytkownika interfejsie, który wykorzystuje trójwymiarowe efekty, cienie, animacje i jednolity język wzrokowy. Ta metodologia projektowania jest bardzo szeroko stosowana w branży w projektowaniu aplikacji mobilnych, stron internetowych i aplikacji webowych. Google dostarcza dokumentację i narzędzia, które pomagają projektantom i deweloperom w implementacji zasad Material Design. Istnieje również wiele bibliotek, które implementują komponenty zgodnie z zasadami Material Design, takich jak MUI (dawniej Material-UI), które zostało wybrane do tego projektu.

### Serwer aplikacji

Serwer aplikacji jest miejscem, w którym odbywa się przetwarzanie danych i wykonywanie operacji biznesowych. Serwer aplikacji powinien być wydajny, skalowalny i łatwy w utrzymaniu. 

Zwracająć się do zasad, zdefiniowanych w sekcji [Postanowienia ogólne w wyborze technologii](#postanowienia-ogólne-w-wyborze-technologii), postanowiono, że serwer aplikacji powinien być zaimplementowany w postaci usługa sieciowa w oparciu w architekturę REST. Usługa sieciowa to aplikacja, która udostępnia interfejs programistyczny (API) do komunikacji z innymi aplikacjami, a architektura REST (Representational State Transfer), jest obecnie najpopularniejszym sposobem tworzenia API. REST jest architekturą opartą na zasobach, która definiuje zasady komunikacji między klientem a serwerem. REST jest również niezależny od protokołu, co oznacza, że może być używany z dowolnym protokołem, takim jak HTTP, HTTPS, TCP, UDP itp.

Istnieję mnóstwo technologii, które mogą być użyte do implementacji usługi REST-owej. W tym projekcie postanowiono użyć następujących technologii:

1. **Spring Framework**: Spring Framework to szkielet budowania aplikacji z bogatą historią, jest dojrzały i powszechnie stosowany w praktyce. Korzystanie ze Spring Framework ułatwia tworzenie aplikacji, ponieważ dostarcza on wiele gotowych rozwiązań, takich jak wstrzykiwanie zależności, bezpieczeństwo, obsługa błędów, obsługa transakcji, obsługa baz danych, obsługa żądań HTTP i wiele innych, co sprawia, że jest idealnym wyborem dla budowania usług REST-owych. 

1. Język Kotlin zamiast Java: Kotlin jest również często używany na backendzie, szczególnie w aplikacjach webowych i mikroserwisach. Dzięki swoim zaletom, takim jak bezpieczeństwo typów i ekspresywna składnia, Kotlin staje się coraz bardziej popularnym wyborem dla programistów tworzących serwery i aplikacje serwerowe. Język Kotlin, mimo że jest jeżykiem multiplatformowym, często jest postrzegany jako następca Javy, ponieważ jest on kompilowany do kodu bajtowego Javy i może być używany w dowolnym środowisku, w którym używana jest Java. A to sprawia, że dla programistów Kotlina jest dostępny cały ekosystem Javy, w tym Spring Framework.
2. 
3. Spring Boot zapewnia szybki start w tworzeniu aplikacji Spring. Spring Boot pozwala pominąć wiele kroków konfiguracyjnych, które są potrzebne do uruchomienia aplikacji Spring, co pozwala na szybsze tworzenie aplikacji. Spring Boot jest również łatwy do rozszerzenia, co oznacza, że można go dostosować do konkretnych potrzeb projektu. 

### Przechowywanie danych

### Zewnętrzne API

### Monitorowanie i analiza pracy aplikacji

### Testowanie

### Wdrożenie

### Uwierzytelnianie i autoryzacja


## Implementacja

### Przygotowanie środowiska
#### Instalacja Node.js
#### Instalacja Docker
#### Instalacja Visual Studio Code
#### Instalacja IntelliJ IDEA
#### Instalacja Git
### Interfejs użytkownika
#### Tworzenie projektu za pomocą Create React App
#### Instalacja dodatkowych bibliotek
#### Implementacja klienta serwera aplikacji
#### Implementacja komponentów
#### Implementacja kontekstów
#### Implementacja układu strony
#### Implementacja pojedynczych widoków
#### Utylity
#### Plik Dockerfile i konfiguracja Nginx
### Serwer aplikacji
#### Tworzenie projektu za pomocą Spring Initializr
#### Gradle i instalacja dodatkowych bibliotek
#### Implementacja domeny aplikacji
#### Implementacja portów i adapterów
#### Integracja domeny z portami i adapterami
#### Integracja z zewnętrznymi API
#### Konfiguracja Spring Security
#### Plik konfiguracyjny aplikacji Spring Boot
#### Plik Dockerfile
#### Testy za pomocą JUnit i Mockito
### Infrastruktura
#### Docker Compose
#### Konfiguracja instancji Keycloak
#### Konfiguracja instancji PostgreSQL
#### Konfiguracja instancji Redis
#### Konfiguracja instancji MinIO
#### Konfiguracja stosu ELK

## Prezentacja
### Rejestracja nowego użytkownika
### Logowanie się do systemu
### Zarządzanie słownikami
### Zarządzanie bazą klientów
### Zarządzanie projektami
#### Przegląd projektów
#### Tworzenie i edycja projektu
#### Zmiana statusu projektu
#### Zmiana terminu realizacji projektu
#### Podział projektu na zadania
#### Zarządzanie zadaniami
#### Zarządzanie kosztami realizacji projektu
#### Zarządzanie dokumentami projektu
#### Komunikacja w ramach projektu
### Monitorowanie pracy systemu
## Przyszłość systemu
### Integracja z narzędziami maszynowego tłumaczenia
### Integracja z narzędziami do analizy tekstu
### Integracja ze słownikami terminologicznymi
### Glosariusze
### Rozbudowanie możliwości raportowania
### Usprawnienia monitorowania pracy systemu
