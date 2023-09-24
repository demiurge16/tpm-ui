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
5. **Zapewnienie przyjazności dla użytkownika**: Aplikacja będzie miała łatwy w użyciu interfejs, dzięki czemu będzie dostępna dla użytkowników o każdym poziomie umiejętności.
6. **Zapewnienie bezpeiczeństwa**: Aplikacja będzie posiadała solidne zabezpieczenia chroniące dane projektu oraz dane użytkowników.
7. **Aspekty techniczne**: Aplikacja będzie elastyczna i skalowalna, aby dostosować się do rosnących potrzeb i wymagań klienta.

Podsumowując, cele i założenia koncepcji aplikacji systemu zarządzania projektami tłumaczeniowymi to usprawnienie i poprawa procesu tłumaczenia poprzez zapewnienie scentralizowanej platformy do zarządzania projektami tłumaczeniowymi, poprawa jakości tłumaczeń, ułatwienie komunikacji i współpracy, poprawa zarządzania zasobami, zapewnienie widoczności i kontroli nad projektem, bycie przyjaznym dla użytkownika, bycie bezpiecznym i możliwość dostosowania do potrzeb klientów.

### Funkcjonalności aplikacji

Aplikacja będzie zawierała następujące funkcje:

1. **Zarządzanie projektami**: Aplikacja zapewni narzędzia do zarządzania projektami tłumaczeniowymi, takie jak tworzenie i edytowanie projektów, przydzielanie zadań oraz śledzenie postępów projektu. Jest to podstawowa funkcja aplikacji, która pomoże usprawnić przepływ pracy tłumaczeniowej. Dla każdego projektu mozna będzie zdefiniować nazwę, opis, szczegóły realizacji, powiązanie z klientem, języki, terminy, oraz budżet. Powstanie też funkcjonalność zarządzania zespołem projektowym oraz centralne repozytorium plików projektu.
2. **Komunikacja i współpraca**: W celach komunikacji w ramach każdego projektu powstanie funkcjonalność tworzenia wątków komunikacyjnych, które będą zawierały temat wątku, treść, oraz możliwość zostawienia komentarzy i reakcji. Każdy wątek będzie miał możliwość zamrożenia, zamknięcia i ponownego otwarcia, co pozwoli na lepszą organizację komunikacji.
3. **Zarządzanie zasobami**: Powstaną narzędzia do śledzenia i raportowania kosztów i czasu, poświęconego na realizacje projektu, co pomoże kierownikom projektów skuteczniej zarządzać zasobami.
4. **Raportowanie i analityka**: Zostanie zaimplementowany widoki siątki z rozbudowanymi opcjami filtrowania i sortowania, dzięki czemu będzie można łatwo znaleźć szukane dane. Powstanie również funkcjonalność eksportu danych z widoków siatek, tak aby można było je wykorzystać w innych aplikacjach w celach raportowania i analizy, takich jak Excel czy Power BI.
5. **Zarządzanie użytkownikami**: Aplikacja zapewni narzędzia do zarządzania użytkownikami, takie jak tworzenie i edycja użytkowników, przypisywanie ról i zarządzanie uprawnieniami.
6. **Bezpieczeństwo**: Powstaną mechanizmy autentykacji i autoryzacji, takie jak logowanie, wylogowanie, resetowanie hasła, zmiana adresu e-mail, oraz resetowanie adresu e-mail. System autentykacji i autoryzacji zapewni konfigurowalność, tak aby można było włączyć lub wyłączyć niektóre z tych mechanizmów.
7. **Aspekty techniczne**: Zostanie zapewniona monitorowalność w postaci rozbudowanego systemu logowania i narzędzi analizy logów, co pomoże w szybkim rozwiązywaniu problemów.

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

Domain-driven design (DDD)
Domain Driven Design (DDD) to podejście do projektowania oprogramowania, które koncentruje się na modelowaniu biznesowych dziedzin (domen) poprzez głębokie zrozumienie ich reguł, procesów i relacji między nimi. W ramach DDD, dziedziny są uważane za centralny punkt projektowania i są reprezentowane za pomocą obiektów w kodzie źródłowym, które odzwierciedlają ich charakterystyczne cechy [1].

Jednym z kluczowych celów DDD jest stworzenie tzw. "języka ogólnego" (ang. ubiquitous language) w projektach oprogramowania. Język ogólny to zestaw terminów i pojęć używanych w danym obszarze, które powinny być używane konsekwentnie przez wszystkich uczestników projektu - zarówno w biznesie, jak i w IT [2]. DDD promuje budowanie modelu dziedziny opartego na tym języku ogólnym, co prowadzi do lepszej komunikacji między różnymi zespołami i ekspertami dziedzinowymi.

DDD wyróżnia się wieloma konceptami, takimi jak agregaty, encje, wartości, fabryki, repozytoria, czy usługi domenowe. Każdy z tych konceptów pełni swoją specyficzną rolę w modelowaniu dziedziny, ale razem tworzą one całość, która odzwierciedla rzeczywistość biznesową [3].

W ostatnich latach DDD zdobyło dużą popularność wśród programistów i architektów oprogramowania pragnących lepiej zrozumieć dziedziny biznesowe oraz tworzyć oprogramowanie, które dokładnie je odzwierciedla. Stosowanie DDD może przyczynić się do tworzenia bardziej elastycznych, skalowalnych i łatwych do utrzymania systemów, które odpowiadają rzeczywistym potrzebom biznesowym [4].

Podsumowując, DDD to podejście projektowania oprogramowania, które skupia się na modelowaniu biznesowych dziedzin. Wykorzystuje język ogólny, co sprzyja lepszej komunikacji i zrozumieniu między różnymi uczestnikami projektu. DDD integruje wiele konceptów, które razem tworzą spójny model dziedziny. Dzięki niemu możliwe jest tworzenie bardziej elastycznych i skalowalnych systemów, które w pełni odpowiadają na potrzeby biznesowe.

1. Evans, E. (2004). Domain-driven design: Tackling complexity in the heart of software. Addison-Wesley Professional.
2. Fowler, M. (2013). Domain-specific languages. Addison-Wesley.
3. Vernon, V. (2011). Implementing Domain-Driven Design. Addison-Wesley Professional.
4. Ghosh, S., & Misra, S. C. (2014). A survey of domain-driven design in current practice.

#### Architektura heksagonalna, czyli wzorzec Porty i adaptery (HA)

Architektura Heksagonalna, często nazywana Architekturą Portów i Adapterów, to wzorzec projektowy, który zdobywa na popularności w świecie tworzenia oprogramowania. HA skupia się na oddzieleniu warstwy aplikacji od logiki biznesowej, co redukuje zależności między nimi i ułatwia proces testowania [1].

Architektura Heksagonalna bazuje na trzech kluczowych elementach: portach, adapterach i rdzeniu. Porty to interfejsy definiujące komunikację między warstwą logiki biznesowej a pozostałymi częściami systemu. Działają jako punkty wejścia i wyjścia do rdzenia systemu, co zwiększa jego elastyczność oraz umożliwia łatwość wprowadzania zmian. Adaptery są natomiast implementacjami tych portów, co pozwala na sprawną integrację warstwy logiki biznesowej z resztą systemu [2].

Rdzeń jest sercem systemu i zawiera całą logikę biznesową. Właśnie tam realizowane są wszystkie operacje powiązane z funkcjonalnościami systemu. Dzięki oddzieleniu warstwy biznesowej od reszty systemu, HA ułatwia testowanie i rozwijanie aplikacji [3]. Ten wzorzec jest szczególnie wartościowy w dużych i skomplikowanych systemach, gdzie elastyczność i łatwość modyfikacji logiki biznesowej są niezbędne.

Zastosowania architektury Heksagonalnej można zaobserwować w wielu aplikacjach, w tym w systemach bankowych czy e-commerce. Jest ona wykorzystywana w projektach, gdzie priorytetem jest elastyczność oraz łatwość wprowadzania zmian w logice biznesowej [1]. Umożliwia to programistom skupienie się na kluczowej warstwie biznesowej bez konieczności martwienia się o resztę systemu.

Podsumowując, Architektura Heksagonalna to efektywne narzędzie umożliwiające wprowadzanie zmian w logice biznesowej bez negatywnego wpływu na inne segmenty systemu. Ułatwia to programistom prace nad warstwą biznesową, co bezpośrednio przekłada się na większą elastyczność oraz łatwość adaptacji systemu [2].

1. A. Włodarczyk, "Hexagonal Architecture w praktyce", https://bulldogjob.pl/articles/806-hexagonal-architecture-w-praktyce, [dostęp: 21.02.2023].
2. A. Roca, "Hexagonal Architecture: Three principles and an implementation example", https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Hexagonal-Architecture-Three-principles-and-an-implementation-example, [dostęp: 21.02.2023].
3. M. Verburg, "Hexagonal Architecture - Practical Example in Java", https://www.baeldung.com/hexagonal-architecture-ddd-spring, [dostęp: 21.02.2023].

#### Wstrzykiwanie zależności (DI)

Wstrzykiwanie zależności (ang. Dependency Injection, DI) to wzorzec projektowy umożliwiający oddzielenie procesu tworzenia obiektów od ich użytkowania. Zamiast inicjowania obiektów bezpośrednio wewnątrz innych obiektów, co może prowadzić do silnego sprzęgnięcia, obiekty są dostarczane z zewnątrz.

W praktyce oznacza to, że dany obiekt nie jest odpowiedzialny za inicjowanie innych obiektów, których potrzebuje. Zamiast tego otrzymuje je z zewnątrz, za pośrednictwem konstruktora, metod czy właściwości [1]. Takie podejście czyni obiekt bardziej elastycznym oraz ułatwia jego testowanie, umożliwiając badanie jego funkcji niezależnie od innych obiektów, z którymi współpracuje.

Wstrzykiwanie zależności można realizować na różne sposoby, między innymi poprzez konstruktor, metody czy właściwości. W każdym z tych przypadków obiekty potrzebne do działania klasy dostarczane są z zewnątrz, nie są tworzone bezpośrednio w jej wnętrzu. Dzięki temu, w sytuacji gdy zachodzi potrzeba zmiany obiektów w klasie, nie musimy modyfikować samej klasy – wystarczy podmienić dostarczane obiekty [2].

DI sprawdza się zwłaszcza w skomplikowanych projektach, gdzie liczba klas i ich wzajemne zależności są duże. Umożliwia ono efektywne zarządzanie tymi zależnościami, co prowadzi do łatwiejszego testowania i rozwijania aplikacji.

Chociaż wstrzykiwanie zależności jest skutecznym sposobem na eliminację silnego sprzęgnięcia, nie jest jedyną metodą osiągnięcia tego celu. Alternatywnym podejściem jest wzorzec fabryki (Factory), który centralizuje tworzenie obiektów i ich dostarczanie do innych klas. W porównaniu jednak z DI, wzorzec fabryki może być bardziej skomplikowany i mniej elastyczny [3].

Źródła:

1. M. Fowler, "Inversion of Control Containers and the Dependency Injection pattern", https://martinfowler.com/articles/injection.html, [dostęp: 21.02.2023].
2. S. Freeman, S. Robson, "Head First Design Patterns", O'Reilly Media, 2004.
3. E. Gamma, R. Helm, R. Johnson, J. Vlissides, "Design Patterns: Elements of Reusable Object-Oriented Software", Addison-Wesley, 1994.

#### Logowanie i monitorowanie

Logowanie i monitorowanie to nieodzowne elementy każdej nowoczesnej aplikacji. Poprzez logowanie zbieramy szczegółowe informacje o tym, co dzieje się wewnątrz aplikacji, podczas gdy monitorowanie pozwala śledzić jej działanie w czasie rzeczywistym oraz szybko reagować na ewentualne problemy. Odpowiednie narzędzia i techniki w tych obszarach są kluczem do zapewnienia wysokiej jakości i niezawodności działania systemu.

Logowanie, inaczej "logging", polega na rejestrowaniu informacji dotyczących różnych wydarzeń zachodzących w aplikacji [1]. Zwykle koncentruje się ono na danych, które pomogą zdiagnozować i rozwiązać problemy. Do logów trafiają informacje o błędach, ostrzeżeniach, danych diagnostycznych oraz żądaniach i odpowiedziach HTTP. W środowiskach chmurowych, logowanie nabiera szczególnego znaczenia, ponieważ umożliwia śledzenie problemów w skomplikowanych, rozproszonych systemach.

Monitoring, z kolei, polega na zbieraniu, analizie i prezentacji danych dotyczących działania aplikacji oraz zasobów na której jest ona uruchomiona, takich jak infrastruktura czy sieć [2]. Dzięki narzędziom monitorującym, jesteśmy w stanie obserwować takie metryki jak wydajność, zużycie pamięci RAM, obciążenie procesora czy przepustowość sieci. Pozwala to administratorom na ciągłą kontrolę nad systemem i szybką interwencję, zapewniając nieprzerwaną pracę aplikacji i satysfakcję użytkowników.

W skrócie, odpowiednie logowanie i monitorowanie są niezbędne do utrzymania jakości i niezawodności aplikacji. Dobrze zaplanowane i skonfigurowane mechanizmy w obu tych obszarach umożliwiają szybką identyfikację oraz rozwiązanie problemów, zanim wpłyną one negatywnie na doświadczenia użytkowników.

Źródła:

1. M. Shema, "Logging Basics", https://www.loggly.com/ultimate-guide/java-logging-basics/, [dostęp: 21.02.2023].
2. A. Otocki, "A beginner's guide to monitoring", https://www.datadoghq.com/blog/monitoring-101-a-beginners-guide/, [dostęp: 21.02.2023].

#### Kombinacja DDD, HA, DI i logowania/monitorowania

Połączenie podejść Domain-Driven Design (DDD), Architektury Heksagonalnej (HA), Wstrzykiwania Zależności (DI) oraz logowania i monitorowania to koncepcja, która zdobyła duże uznanie we współczesnym programowaniu. DDD skupia się na tworzeniu precyzyjnego modelu biznesowego, pomagając jednocześnie zidentyfikować kluczowe koncepcje biznesowe niezbędne podczas tworzenia aplikacji [1]. HA, z kolei, umożliwia izolację logiki biznesowej od specyfik technologicznych, co sprzyja łatwości wprowadzania zmian [2]. DI sprzyja elastyczności w zarządzaniu zależnościami, co ułatwia testowanie i implementację zmian [3]. Tymczasem systemy logowania i monitorowania odgrywają kluczową rolę w obserwacji i diagnostyce aplikacji, szybkim wykrywaniu oraz rozwiązywaniu problemów.

Integracja tych metodologii jest szczególnie wartościowa dla projektów o dużej skali i potrzebie elastyczności. Pomaga to utrzymać klarowną i spójną architekturę aplikacji, ułatwia testowanie, diagnostykę oraz efektywne wprowadzanie zmian. DI w tym kontekście jest niezwykle ważne, ponieważ umożliwia dynamiczną modyfikację zależności między modułami bez konieczności interwencji w istniejący kod, co znacząco usprawnia zarządzanie projektem.

Pomimo wielu korzyści, warto podkreślić pewne wyzwania związane z zastosowaniem tych podejść. Wymagają one od programistów głębokiej wiedzy i doświadczenia, ponieważ każda z tych metodologii posiada własne zalecenia i najlepsze praktyki. Jednak, przy prawidłowym zastosowaniu, korzyści z ich wykorzystania w projektach o dużej skali i złożoności są nie do przecenienia [4].

Podsumowując, integracja DDD, HA, DI oraz logowania i monitorowania jest niezwykle efektywna w projektowaniu aplikacji. Umożliwia tworzenie spójnych, elastycznych i łatwych w utrzymaniu systemów, choć wymaga od programistów zaawansowanej wiedzy i umiejętności.

Źródła:

1. Evans, Eric. "Domain-driven design: tackling complexity in the heart of software." Pearson Education, 2004.
2. "Hexagonal architecture." Port on Patterns, 2013, https://www.innoq.com/en/portals/hexagonal-architecture/.
3. Freeman, Adam, and James Turnbull. "Building microservices: designing fine-grained systems." O'Reilly Media, Inc., 2015.
4. Szewczyk, Paweł. "Combining Domain-Driven Design and Hexagonal Architecture to develop robust and maintainable web applications." Procedia Computer Science 126 (2018): 1191-1200.

## Stos technologiczny

### Postanowienia ogólne w wyborze technologii

Wybierając stos technologiczny dla systemu organizacji pracy w biurze tłumaczeń, istnieje wiele ogólnych postanowień, które warto wziąć pod uwagę. Stos technologiczny to zestaw narzędzi, frameworków, języków programowania i infrastruktury, które zostaną wykorzystane do budowy i zarządzania systemem. Oto kilka kluczowych aspektów, które postanowiono rozważyć przy wyborze stosu technologicznego[1]:

1. **Cel i wymagania systemu**: Jakie funkcje i możliwości ma zapewnić system? Jakie problemy ma rozwiązywać? To pomoże w określeniu, jakie technologie najlepiej spełnią te cele.

2. **Skalowalność**: System musi być elastyczny, umożliwiający nie tylko obsługę większej liczby użytkowników, ale też łatwą adaptację do nowych funkcji i wymagań.

3. **Bezpieczeństwo**: Bezpieczeństwo jest kluczowym aspektem w biurze tłumaczeń, gdzie dane klientów mogą być poufne. Należy wybierać technologie, które zapewnią odpowiednie mechanizmy ochrony danych, uwzględniając kwestie takie jak szyfrowanie i autoryzacja, zarządzanie dostępem oraz obrona przed atakami z zewnątrz.

4. **Integracje**: Wybrane technologie powinne pozwalać na łatwe integrowanie się z innymi narzędziami i systemami, które biuro tłumaczeń już używa, na przykład z narzędziami do zarządzania projektami, systemami CRM, API zewnętrznych dostawców czy narzędziami do tłumaczeń.

5. **Wspieranie języków**: Specyfika pracy biura tłumaczeń często ma za sobą obsługę wielu języków, ważne jest, aby stos technologiczny obsługiwał różne zestawy znaków i mógł być dostosowany do specyfiki różnych języków.

6. **Łatwość utrzymania i rozwoju**: Należy wybierać technologie, które są stosunkowo łatwe do utrzymania i rozwijania. To pomoże zminimalizować koszty eksploatacji i zapewnić, że system będzie gotowy na przyszłe zmiany i ulepszenia.

7. **Wsparcie społeczności i dokumentacja**: Ważne jest też sprawdzić, czy wybrane technologie cieszą się wsparciem społeczności programistycznej, co ułatwi rozwiązywanie problemów i znajdowanie odpowiedzi na pytania. Również dostępność do dobrej dokumentacji jest kluczowa. W przyszłości, wybór popularnych i lubianych technologii może ułatwić znalezienie nowych pracowników do zespołu utrzymania i rozwoju systemu. Narzędzia, lubiane przez społeczność, są zwykle dłużej utrzymywane i rozwijane, co jest ważne w przypadku długoterminowego projektu.

8. **Koszty**: Koszty są istotnym czynnikiem. Każde biuro tłumaczeń ma inne możliwości finansowe, ale wszystkie chcą zapewnić że koszt utrzymania i rozwoju systemu będzie jak najniższy. Dla tego ważne jest, aby wybierać technologie, które oferują najlepszy stosunek ceny do wartości, uwzględniając zarówno darmowe, jak i płatne opcje.

9. **Zgodność z przepisami prawno-regulacyjnymi**: Jeśli biuro tłumaczeń obsługuje tłumaczenia o charakterze prawnym, medycznym lub innym specjalistycznym, należy upewnić się, że wybrane technologie pomogą w spełnieniu wymogów prawnych i regulacyjnych.

Żródła:

1. https://www.softermii.com/blog/10-tips-in-choosing-the-best-tech-stack-for-your-web-application

### Interfejs użytkownika

Interfejs użytkownika (UI), czasem nazywany interfejsem graficznym użytkownika (GUI), stanowi kluczową część oprogramowania, umożliwiającą interakcję między użytkownikiem a systemem komputerowym. To właśnie dzięki UI użytkownik obcuje z aplikacją; zawiera on przyciski, pola tekstowe, menu, ikony i inne elementy nawigacyjne. Istotą dobrze zaprojektowanego interfejsu jest jego intuicyjność i użyteczność, co jest szczególnie ważne w systemach służących do organizacji pracy, gdyż są one używane przez użytkowników na co dzień.

W kontekście tworzonego systemu do organizacji pracy biura tłumaczeń, postanowiono, aby interfejs użytkownika przybrał formę aplikacji webowej. Wybór ten podyktowany jest wieloma zaletami aplikacji internetowych, wśród których warto wymienić:

1. **Dostępność z różnych lokalizacji i urządzeń**: Aplikacje webowe są dostępne poprzez przeglądarki internetowe. Umożliwia to korzystanie z systemu z dowolnego miejsca świata oraz na różnorodnych urządzeniach - od komputerów po smartfony. Taka elastyczność jest kluczowa dla biura tłumaczeń, gdzie mobilność i zdalna praca są na porządku dziennym.
2. **Prostota aktualizacji i konserwacji**: Aplikacje webowe są łatwe do aktualizacji. Zmiany są wprowadzane centralnie i natychmiast dostępne dla wszystkich użytkowników, eliminując potrzebę indywidualnych aktualizacji na poszczególnych urządzeniach.
3. **Skalowalność**: Aplikacje te mogą być dostosowane do potrzeb zarówno małych biur tłumaczeń, jak i dużych korporacji. W miarę wzrostu firmy, system może być odpowiednio rozbudowywany.
4. **Bezpieczeństwo**: Poprzez zastosowanie odpowiednich protokołów i mechanizmów, takich jak szyfrowanie danych czy uwierzytelnienie, aplikacje webowe mogą zapewnić wysoki poziom bezpieczeństwa.

Po wyborze formy aplikacji internetowej na interfejs użytkownika, kluczowym stało się określenie technologii niezbędnych do jego realizacji. W świetle przyjętych założeń projektowych, postanowiono wykorzystać:

1. **React**: To dynamicznie rozwijana biblioteka JavaScript, przeznaczona do tworzenia interfejsów użytkownika[1]. React pozwala na budowę modułowych, łatwych do zarządzania komponentów, które można wielokrotnie wykorzystywać w różnych częściach aplikacji. Ważne jest, że React, jako biblioteka, skupia się głównie na interfejsie użytkownika, pozostawiając programiście swobodę w wyborze innych narzędzi do zarządzania stanem aplikacji czy nawigacją.
2. **Typescript**: To rozszerzenie języka JavaScript, które wprowadza m.in. statyczne typowanie[2]. Dzięki temu pozwala wyłapać wiele błędów jeszcze przed uruchomieniem kodu, co przekłada się na większą stabilność i bezpieczeństwo aplikacji.
3. **Material Design**: Zestaw wytycznych i zasad projektowania interfejsów, stworzony przez Google[3]. Skupia się na tworzeniu spójnych, intuicyjnych i nowoczesnych aplikacji. Wykorzystanie gotowych komponentów zgodnych z Material Design, takich jak te dostarczane przez MUI[4], przyspiesza proces tworzenia aplikacji i gwarantuje estetyczny oraz ujednolicony wygląd.

Kombinacja React z TypeScriptem zapewnia solidne podstawy do tworzenia stabilnych i wydajnych aplikacji. Material Design, z kolei, gwarantuje intuicyjny i estetyczny interfejs, co przekłada się na lepsze doświadczenie użytkownika.

Źródła:

1. React - [https://react.dev/](https://react.dev/)
2. Typescript - [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
3. Material Design - [https://m3.material.io/](https://m3.material.io/)
4. MUI - [https://mui.com/](https://mui.com/)

### Serwer aplikacji

Serwer aplikacji służy jako centralne miejsce przetwarzania danych oraz zarządzania operacjami biznesowymi. Musi być on wydajny, skalowalny oraz łatwy w utrzymaniu. 

Kierując się zasadami określonymi w sekcji [Postanowienia ogólne w wyborze technologii](#postanowienia-ogólne-w-wyborze-technologii), podjęto decyzję o implementacji serwera aplikacji w formie usługi sieciowej bazującej na architekturze REST. Usługa sieciowa to aplikacja oferująca interfejs programistyczny (API), umożliwiający komunikację z innymi aplikacjami. Architektura REST (Representational State Transfer) stanowi obecnie dominujący standard tworzenia API. Charakteryzuje się ona oparciem o zasoby i definiuje sposób komunikacji między klientem a serwerem. Warto również podkreślić, że REST jest niezależny od protokołu, co pozwala na jego zastosowanie z różnymi protokołami, takimi jak HTTP, HTTPS, TCP, UDP i inne.

Do realizacji tego projektu wybrano następujące technologie:

1. **Spring Framework**: Jest to sprawdzony w praktyce szkielet do tworzenia aplikacji[1]. Dzięki niemu łatwiej jest budować zaawansowane systemy, ponieważ oferuje on gotowe rozwiązania dla wielu aspektów rozwoju oprogramowania, takich jak wstrzykiwanie zależności, bezpieczeństwo, obsługa błędów, a także obsługa baz danych. Jego elastyczność czyni go doskonałym wyborem do tworzenia usług REST-owych.
2. **Spring Boot**: Uproszczony start z Spring[2]. Dzięki Spring Boot możemy ominąć wiele kroków konfiguracyjnych wymaganych przy tradycyjnym podejściu do Springa, przyspieszając tym samym rozwój aplikacji.
3. **Spring Cloud**: Zestaw narzędzi zoptymalizowany do tworzenia aplikacji rozproszonych[3]. Dzięki niemu łatwiej jest zarządzać problemami typowymi dla systemów rozproszonych, takimi jak odkrywanie usług czy obsługa obciążenia.
4. **Spring Data**: Ułatwia interakcję z bazami danych poprzez abstrakcję na poziomie repozytorium[4], eliminując potrzebę ręcznego pisania zapytań do bazy. Zintegrowane rozwiązania dla różnych baz danych pozwalają na łatwe zarządzanie i manipulację danymi.
5. **Spring Security**: Framework skoncentrowany na zapewnieniu szerokiego zakresu funkcji autentykacji i autoryzacji[5]. Oferuje wsparcie dla różnych mechanizmów bezpieczeństwa, takich jak uwierzytelnianie oparte na formularzach, OAuth2 czy JWT.
6. **Język Kotlin**: Chociaż Kotlin[6] jest często kojarzony z programowaniem aplikacji mobilnych, znalazł on również szerokie zastosowanie w środowisku backendowym. Jego ekspresywna składnia oraz silne wsparcie dla bezpieczeństwa typów czynią go atrakcyjnym wyborem dla wielu programistów. Kotlin jest kompatybilny z Java, co umożliwia korzystanie z bogatego ekosystemu tej technologii, w tym z frameworku Spring.

Kluczową zaletą skorzystania z technologii Spring oraz jej podprojektów jest ich dojrzałość, wsparcie społeczności oraz bogactwo funkcjonalności. Spring Framework stał się de facto standardem w świecie aplikacji Java. Jego modułowość, szeroki zakres funkcji i elastyczność stanowią silne podstawy do tworzenia niezawodnych i wydajnych aplikacji. Kotlin, jako język programowania, dodaje wartość dzięki swojej ekspresywności, bezpieczeństwu i kompatybilności z technologią Java. W połączeniu z frameworkiem Spring, Kotlin może naprawdę przyspieszyć rozwój projektu, jednocześnie zapewniając wysoką jakość kodu.

Źródła:

1. Spring Framework - [https://spring.io/projects/spring-framework](https://spring.io/projects/spring-framework)
2. Spring Boot - [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
3. Spring Cloud - [https://spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud)
4. Spring Data - [https://spring.io/projects/spring-data](https://spring.io/projects/spring-data)
5. Spring Security - [https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)
6. Kotlin - [https://kotlinlang.org/](https://kotlinlang.org/)

### Przechowywanie danych

### Przechowywanie danych

Przechowywanie danych to kluczowy aspekt każdej aplikacji. Wybór odpowiednich technologii do przechowywania, zarządzania i odzyskiwania danych jest niezbędny dla zapewnienia wydajności, niezawodności i elastyczności systemu.

Opierając się na wcześniej ustalonych zasadach, zdefiniowanych w sekcji [Postanowienia ogólne w wyborze technologii](#postanowienia-ogólne-w-wyborze-technologii), dokonano wyboru technologii przechowywania danych w następujący sposób:

1. **Postgres**: Jest to jedna z najbardziej zaawansowanych baz danych typu open-source na świecie. Postgres oferuje wsparcie dla transakcji, zaawansowane funkcje indeksowania, możliwość przechowywania różnorodnych typów danych i wiele innych funkcji niezbędnych do skutecznego zarządzania danymi w skali dużych aplikacji. Jego niezawodność, skalowalność oraz wsparcie dla procedur składowanych i wyzwalaczy czynią go idealnym wyborem dla przechowywania głównych danych aplikacyjnych.
2. **Redis**: To bardzo wydajna, in-memory baza danych, która często jest wykorzystywana jako system cache. Dzięki przechowywaniu danych w pamięci RAM, Redis oferuje błyskawiczny czas dostępu do danych, co jest niezwykle przydatne dla operacji wymagających szybkiego odczytu. Redis jest nie tylko systemem pamięci podręcznej, ale również oferuje struktury danych, takie jak listy, zestawy, mapy i kolejki, co sprawia, że jest wszechstronnym narzędziem do różnorodnych zastosowań w aplikacji.
3. **MinIO**: MinIO to wysokiej wydajności, rozproszony magazyn plików i obiektów. Dzięki swojej skalowalności i wydajności jest idealny do przechowywania dużych ilości plików, takich jak obrazy, filmy czy dokumenty. MinIO zapewnia też funkcje takie jak szyfrowanie, replikacja czy wersjonowanie obiektów. Jego architektura API jest kompatybilna z Amazon S3, co czyni go łatwym w integracji z wieloma aplikacjami i narzędziami dostępnymi na rynku.

Wspólnie, te technologie tworzą kompleksowy ekosystem przechowywania danych, który może sprostać różnorodnym wymaganiom aplikacji, zarówno pod względem wydajności, jak i bezpieczeństwa. Poprzez połączenie relacyjnej bazy danych (Postgres) z szybką pamięcią podręczną (Redis) oraz skalowalnym magazynem plików (MinIO), aplikacja jest w stanie efektywnie zarządzać danymi w różnorodnych scenariuszach użycia.

### Zewnętrzne API

W erze cyfrowej wiele aplikacji polega na zewnętrznych źródłach danych, które oferują specyficzne informacje lub funkcje. Zewnętrzne API (Application Programming Interface) umożliwiają aplikacjom dostęp do takich danych w sposób ustrukturyzowany i automatyczny. W projekcie zdecydowano się skorzystać z trzech kluczowych zewnętrznych API, aby uzyskać dostęp do różnych zestawów danych i funkcji:

1. **Restcountries**
    - **Opis**: Restcountries to publiczne API dostarczające informacji na temat różnych krajów na świecie. Umożliwia użytkownikom dostęp do szczegółów takich jak nazwa kraju, stolica, populacja, waluta, język, flaga i wiele innych.
    - **Zastosowanie**: Wykorzystanie tego API pozwala na bieżące informacje dotyczące krajów, co może być przydatne w wielu aplikacjach, zwłaszcza tych o charakterze międzynarodowym.
    - **Link**: [https://restcountries.com/](https://restcountries.com/)

2. **SIL International Code Tables**
    - **Opis**: SIL International Code Tables oferują kody dla różnych języków, krajów oraz skryptów. Są one szeroko używane w międzynarodowych projektach oraz w badaniach lingwistycznych.
    - **Zastosowanie**: Dzięki temu API aplikacja może identyfikować języki, kraje i skrypty za pomocą standardowych kodów, co zapewnia spójność danych i ułatwia integrację z innymi systemami.
    - **Link**: [https://iso639-3.sil.org/code_tables](https://iso639-3.sil.org/code_tables)

3. **Exchangerate.host**
    - **Opis**: Exchangerate.host to bezpłatne API umożliwiające dostęp do aktualnych kursów walut oraz historycznych danych. API korzysta z różnych źródeł, aby zapewnić dokładne i aktualne informacje.
    - **Zastosowanie**: W aplikacjach biznesowych, zwłaszcza w tych, które obsługują różne waluty, aktualne kursy walut są niezbędne. Exchangerate.host jest nieocenionym narzędziem w takich przypadkach, umożliwiając łatwą konwersję walut oraz analizę historycznych trendów kursów walut.
    - **Link**: [https://exchangerate.host/](https://exchangerate.host/)

Współczesne aplikacje często opierają się na zewnętrznych źródłach danych, które wzbogacają ich funkcjonalność i zapewniają wartość dodaną dla użytkowników. Wybór odpowiednich API jest kluczowy dla funkcjonalności i niezawodności aplikacji. Restcountries, SIL International Code Tables i Exchangerate.host zostały wybrane ze względu na ich niezawodność, dokładność danych oraz łatwość integracji. Korzystanie z tych API umożliwi aplikacji dostarczanie dokładnych i aktualnych danych w różnych kontekstach, od informacji geograficznych i lingwistycznych po finansowe.

### Monitorowanie i analiza pracy aplikacji

Monitorowanie i analiza działania aplikacji są kluczowymi elementami w procesie zarządzania i utrzymania oprogramowania. Umożliwiają one identyfikację i rozwiązywanie problemów, a także dostarczają cennych informacji na temat wydajności i zachowania użytkowników. Jednym z najbardziej popularnych rozwiązań na rynku, które pozwala na kompleksową analizę danych operacyjnych z aplikacji, jest stos ELK, składający się z trzech głównych komponentów: Elasticsearch, Logstash i Kibana.

1. **Elasticsearch**: Jest to silnik wyszukiwania i analizy w czasie rzeczywistym oparty na Lucene. Pozwala na przechowywanie, indeksowanie i analizę dużych ilości danych. Jest wysoce skalowalny i może przetwarzać terabajty danych w ciągu sekund. Elasticsearch zapewnia możliwość szybkiego wyszukiwania i agregacji danych, co jest kluczowe dla monitorowania i analizy w czasie rzeczywistym.

2. **Logstash**: To narzędzie służące do zbierania, przetwarzania i przesyłania logów i danych operacyjnych do różnych miejsc przechowywania, w tym do Elasticsearch. Logstash jest niezwykle elastyczny i pozwala na zbieranie danych z różnych źródeł, ich przetwarzanie (np. filtracja, wzbogacanie) oraz przesyłanie do wielu różnych celów.

3. **Kibana**: Jest to narzędzie do wizualizacji danych przechowywanych w Elasticsearch. Umożliwia tworzenie różnorodnych dashboardów, map cieplnych, wykresów i tabel, które pozwalają na dogłębną analizę zgromadzonych danych. Dzięki Kibanie, zespoły IT mogą w łatwy sposób monitorować wydajność aplikacji, identyfikować problemy oraz analizować zachowanie użytkowników.

Korzystanie z ELK w kontekście monitorowania aplikacji daje wiele korzyści:

- **Szybkość reakcji**: Dzięki analizie w czasie rzeczywistym możliwe jest szybkie wykrywanie i rozwiązywanie problemów związanych z wydajnością, błędami czy awariami.
  
- **Elastyczność**: Stos ELK pozwala na integrację z wieloma źródłami danych, co umożliwia zbieranie i analizę informacji z różnych części systemu.
  
- **Skalowalność**: ELK jest w stanie obsłużyć bardzo duże ilości danych, dzięki czemu nadaje się do monitorowania zarówno małych aplikacji, jak i dużych systemów enterprise.
  
- **Personalizacja**: Możliwość dostosowywania dashboardów w Kibana do indywidualnych potrzeb pozwala na tworzenie spersonalizowanych widoków dla różnych użytkowników i zespołów.

Podsumowując, stos ELK jest potężnym narzędziem, które pozwala na kompleksowe monitorowanie i analizę działania aplikacji. Jego modułowa budowa oraz integracja z wieloma źródłami danych sprawiają, że jest to jedno z najlepszych rozwiązań dostępnych na rynku w zakresie analizy operacyjnej.

### Testowanie

W dzisiejszym świecie programistycznym nie można podważać znaczenia testowania. Właściwie przetestowane oprogramowanie nie tylko zwiększa zaufanie do kodu, ale również pozwala deweloperom na szybkie wprowadzanie zmian, mając pewność, że nie wprowadzają regresji. W ekosystemie Java dwa najpopularniejsze narzędzia używane do testowania jednostkowego to JUnit i Mockito.

1. **JUnit**: Jest to ramka do testowania jednostkowego dla języka Java. JUnit umożliwia szybkie i skuteczne testowanie fragmentów kodu, zwanych jednostkami, w izolowanym środowisku. Nowa wersja, JUnit 5, wprowadza wiele ulepszeń, takich jak możliwość grupowania testów czy parametryzowania, co sprawia, że testowanie staje się jeszcze bardziej elastyczne i wydajne.

2. **Mockito**: To biblioteka do tworzenia atrap (ang. mock) obiektów w testach jednostkowych w Javie. Mockito pozwala na symulowanie zachowania zewnętrznych zależności w testowanych jednostkach, dzięki czemu testy są naprawdę niezależne od zewnętrznego środowiska. Dzięki temu deweloperzy mogą skupić się na testowaniu konkretnego zachowania, a nie całego systemu.

Aby w pełni korzystać z możliwości JUnit i Mockito, ważne jest, aby pisać kod, który jest łatwy do testowania. Oto kilka wskazówek, jak to osiągnąć:

- **Modularyzacja**: Kod powinien być podzielony na mniejsze, niezależne moduły lub klasy. Dzięki temu można testować każdy fragment osobno, co ułatwia identyfikację i naprawę błędów.

- **Unikanie zbyt wielu zależności**: Im mniej zależności ma dana klasa, tym łatwiej jest ją przetestować. Gdzie to możliwe, należy korzystać z wstrzykiwania zależności, co pozwala na łatwą zamianę rzeczywistych komponentów na atrapy w testach.

- **Przejrzystość funkcji**: Każda funkcja lub metoda powinna wykonywać jedno konkretne zadanie. Nie tylko ułatwia to testowanie, ale również sprawia, że kod jest czytelniejszy i łatwiejszy do utrzymania.

- **Korzystanie z interfejsów**: W Javie korzystanie z interfejsów pozwala na tworzenie bardziej elastycznego i łatwego do testowania kodu. Mockito doskonale radzi sobie z naśladowaniem interfejsów, co ułatwia symulację zachowań w testach.

- **Unikanie kodu statycznego i singletonów**: Są one trudne do testowania i mogą prowadzić do problemów z izolacją w testach. Zamiast tego lepiej korzystać z wzorców projektowych, które umożliwiają lepszą kontrolę nad zależnościami.

Podsumowując, testowanie jest kluczowym elementem cyklu życia oprogramowania. Korzystając z narzędzi takich jak JUnit i Mockito oraz pisząc kod z myślą o testowalności, deweloperzy mogą znacznie zwiększyć jakość swojego oprogramowania, zredukować liczbę błędów i usprawnić proces wdrażania zmian.

### Wdrożenie

Wdrożenie oprogramowania to kluczowy etap w cyklu życia projektu, który ma na celu umożliwienie użytkownikom dostępu do aplikacji w środowisku produkcyjnym. Współczesne praktyki w zakresie wdrażania skupiają się na automatyzacji, reprodukowalności i skalowalności rozwiązań. Jednym z narzędzi, które odmieniło podejście do wdrażania i zarządzania aplikacjami, jest Docker. Docker to platforma, która pozwala na tworzenie, wdrażanie i uruchamianie aplikacji w kontenerach. Konteneryzacja, czyli izolowanie aplikacji w kontenerach, przypomina działanie maszyn wirtualnych, ale jest bardziej lekka i elastyczna.

Kluczowe korzyści wynikające z użycia Dockera w procesie wdrożenia:

- **Reprodukowalność**: Dzięki Dockerowi, aplikacja działa identycznie w każdym środowisku, od deweloperskiego po produkcyjne. Kontenery zawierają wszystko, co potrzebne do działania aplikacji, co eliminuje problem "u mnie działa".

- **Izolacja**: Każdy kontener działa niezależnie, co oznacza, że jedna aplikacja nie wpływa na działanie innych. To idealne rozwiązanie dla mikrousług lub gdy kilka aplikacji działa na jednym serwerze.

- **Skalowalność**: Docker współpracuje z narzędziami do orkiestracji, takimi jak Kubernetes, co umożliwia automatyczne skalowanie aplikacji w zależności od obciążenia.

- **Szybkość**: Kontenery Dockera są lżejsze niż tradycyjne maszyny wirtualne i uruchamiają się szybciej. Pozwala to na błyskawiczne wdrożenia i aktualizacje.

- **Integracja z CI/CD**: Docker może być zintegrowany z narzędziami do ciągłej integracji i dostarczania (CI/CD), co automatyzuje proces budowania, testowania i wdrażania aplikacji.

**Proces wdrożenia z Dockerem**:

1. **Tworzenie obrazu**: Pierwszym krokiem jest stworzenie obrazu Dockera na podstawie pliku `Dockerfile`, który opisuje, jak skonfigurować środowisko dla aplikacji. Obraz ten zawiera wszystkie zależności potrzebne do działania aplikacji.

2. **Przechowywanie obrazów**: Po utworzeniu obraz można go przechowywać w repozytorium, takim jak Docker Hub lub prywatne repozytorium. Umożliwia to łatwe rozpowszechnianie obrazu wśród członków zespołu lub w różnych środowiskach.

3. **Uruchamianie kontenera**: Z obrazu można uruchomić kontener, który działa na docelowej maszynie lub klastrze. Kontener uruchamia aplikację w izolowanym środowisku, które zostało wcześniej zdefiniowane w `Dockerfile`.

Podsumowując, Docker odmienił sposób, w jaki myślimy o wdrożeniach, oferując rozwiązania, które są jednocześnie szybkie, niezawodne i skalowalne. Dzięki niemu zespoły mogą skupić się na tworzeniu świetnych aplikacji, mając pewność, że będą one działać tak samo w każdym środowisku.

### Uwierzytelnianie i autoryzacja

Uwierzytelnianie i autoryzacja to dwie kluczowe kwestie w zakresie bezpieczeństwa każdej aplikacji. Uwierzytelnianie polega na weryfikacji tożsamości użytkownika, podczas gdy autoryzacja określa, jakie zasoby są dostępne dla uwierzytelnionego użytkownika. W tym rozdziale przedstawimy technologie, które wspomagają te procesy: Keycloak, SSO, OIDC, OAuth2 i JWT.

1. **Keycloak**: Keycloak to otwarte oprogramowanie do zarządzania tożsamością i dostępem. Umożliwia uwierzytelnianie, autoryzację oraz centralne zarządzanie użytkownikami. Zapewnia wsparcie dla wielu protokołów uwierzytelniania, w tym SSO, OIDC i OAuth2, zarządzanie sesjami użytkowników, integrację z różnymi bazami danych użytkowników, takimi jak LDAP czy Active Directory, oraz rozbudowę poprzez dodatki.

2. **SSO (Single Sign-On)**: SSO to metoda jednokrotnego logowania, która pozwala użytkownikom na dostęp do wielu aplikacji i systemów po jednorazowym uwierzytelnieniu. Zamiast wielokrotnego logowania do różnych aplikacji, użytkownik loguje się tylko raz, a jego tożsamość jest automatycznie rozpoznawana w innych systemach.

3. **OIDC (OpenID Connect)**: OIDC to rozszerzenie protokołu OAuth2, które dodaje funkcje uwierzytelniania. Umożliwia klientom zdobycie informacji o tożsamości uwierzytelnionego użytkownika.

4. **OAuth2**: OAuth2 to protokół autoryzacji, umożliwiający aplikacjom ograniczony dostęp do kont użytkowników w innych usługach. Na przykład, użytkownik może pozwolić aplikacji A na dostęp do jego danych w usłudze B, nie udostępniając swojego hasła do usługi B.

5. **JWT (JSON Web Token)**: JWT to standard kodowania informacji o użytkowniku w postaci tokena. Jest on cyfrowo podpisany, co gwarantuje jego autentyczność i integralność. Może być używany do przesyłania informacji o tożsamości użytkownika między systemami.

Korzystając z tych technologii, możemy stworzyć zaawansowany system uwierzytelniania i autoryzacji. Dzięki Keycloak, który może służyć jako centralny serwer uwierzytelniania, możemy wdrożyć SSO we wszystkich naszych aplikacjach. Gdy użytkownik loguje się po raz pierwszy, Keycloak generuje token JWT, który jest przekazywany do aplikacji. Token ten potwierdza tożsamość użytkownika i może zawierać informacje o jego uprawnieniach, bazując na protokołach takich jak OIDC i OAuth2.

Odpowiednia konfiguracja uwierzytelniania i autoryzacji jest kluczem do ochrony danych i zasobów przed nieuprawnionym dostępem, jednocześnie gwarantując użytkownikom łatwy dostęp do potrzebnych zasobów. Wspomniane technologie pozwalają zbudować bezpieczny i wydajny system uwierzytelniania.

## Implementacja

### Przygotowanie środowiska
#### Instalacja Node.js

Node.js to środowisko uruchomieniowe JavaScript, umożliwiające wykonywanie kodu JavaScript poza przeglądarką. W naszym projekcie Node.js będzie używane głównie do uruchomienia serwera deweloperskiego dla Reacta, co umożliwi efektywny rozwój i testowanie aplikacji front-endowej. Dzięki temu programiści będą mogli korzystać z funkcji, takich jak "hot reloading", co znacząco przyspiesza proces tworzenia oprogramowania. 

Node.js dostarcza również menedżera pakietów npm, który jest niezbędnym narzędziem dla każdego programisty JavaScript. Npm pozwala na zarządzanie zależnościami projektu i jest wykorzystywany do instalowania, udostępniania i zarządzania zależnościami (takimi jak biblioteki i narzędzia), które są niezbędne do rozwoju aplikacji.

Aby zainstalować Node.js na Windowsie, należy pobrać instalator z oficjalnej strony projektu Node.js i postępować zgodnie z instrukcjami wyświetlanymi przez instalator. Po zakończeniu instalacji, można sprawdzić poprawność instalacji, otwierając wiersz poleceń i wpisując polecenie `node -v`. Prawidłowa odpowiedź powinna zawierać numer zainstalowanej wersji Node.js. Aby sprawdzić czy npm został poprawnie zainstalowany razem z Node.js, można użyć polecenia `npm -v`, które także powinno zwrócić numer wersji.

#### Instalacja Docker

Docker to platforma umożliwiająca konteneryzację aplikacji, co sprawia, że aplikacje są izolowane w kontenerach, co z kolei umożliwia łatwe przenoszenie i uruchamianie ich w różnych środowiskach. Docker jest niezbędnym narzędziem dla programistów, umożliwiającym tworzenie, testowanie, i rozmieszczanie aplikacji w izolowanym, spójnym i powtarzalnym środowisku.

Docker umożliwia instalację różnych narzędzi, silników baz danych, serwerów WWW i instancji serwisów, takich jak ELK, prawie nie ingerując w działanie maszyny-hosta. To pozwala na szybkie stawianie środowiska od zera, bez obaw o konflikty z wcześniej zainstalowanym oprogramowaniem.

W kontekście pracy nad systemem organizacji pracy dla biura tłumaczeń, Docker będzie używany do uruchamiania różnych serwisów i narzędzi. Ułatwi to zarządzanie zależnościami oraz konfigurację środowiska programistycznego i produkcyjnego. Dzięki Dockerowi, konfiguracja środowiska jest jednolita dla wszystkich programistów pracujących nad systemem, minimalizując ryzyko pojawienia się błędów wynikających z różnic w konfiguracji lokalnych środowisk programistycznych.

Aby zainstalować Docker na platformie Windows, należy pobrać instalator Docker Desktop for Windows ze strony [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows) i postępować zgodnie z instrukcjami wyświetlanymi przez instalator. Po zakończeniu instalacji, Docker powinien być dostępny w menu Start. Aby sprawdzić, czy instalacja przebiegła prawidłowo, można otworzyć wiersz poleceń i wpisać polecenie `docker -v`, które powinno zwrócić numer zainstalowanej wersji Docker.

#### Instalacja Visual Studio Code

Visual Studio Code to lekki, ale potężny edytor kodu źródłowego, dostępny na różne platformy, który staje się coraz bardziej popularny wśród programistów. Jest to narzędzie, które charakteryzuje się minimalnym użyciem zasobów komputera, co sprawia, że jest bardzo wydajne, nawet na komputerach o ograniczonej mocy obliczeniowej. Visual Studio Code oferuje także prawie nieograniczone możliwości personalizacji oraz konfiguracji za pomocą rozszerzeń dostępnych w sklepie Visual Studio Code Marketplace, co pozwala dostosować edytor do indywidualnych potrzeb i preferencji każdego programisty.

W kontekście budowy systemu organizacji pracy dla biura tłumaczeń, Visual Studio Code zostanie użyty głównie do tworzenia i modyfikowania kodu aplikacji front-endowej. Jego przystępność, elastyczność i wydajność sprawiają, że jest to idealne narzędzie do prac związanych z rozwojem aplikacji opartej na technologiach webowych.

Aby zainstalować Visual Studio Code na platformie Windows, należy najpierw odwiedzić stronę [Visual Studio Code](https://code.visualstudio.com/) i pobrać instalator dla systemu Windows. Następnie, po pobraniu, uruchomić instalator i postępować zgodnie z instrukcjami wyświetlanymi przez kreatora instalacji. Po zakończeniu procesu instalacji, Visual Studio Code będzie dostępny w menu Start, gotowy do uruchomienia i konfiguracji zgodnie z indywidualnymi preferencjami, w tym dodawania odpowiednich rozszerzeń dostępnych w Visual Studio Code Marketplace.

Visual Studio Code to narzędzie, które doskonale nadaje się do pracy nad różnymi typami projektów programistycznych, a jego elastyczność i możliwość personalizacji pozwalają na dostosowanie edytora do konkretnych wymagań projektu, co sprawia, że jest to jedno z kluczowych narzędzi wykorzystywanych w procesie tworzenia oprogramowania.

#### Instalacja IntelliJ IDEA

IntelliJ IDEA to zaawansowane środowisko programistyczne (IDE) stworzone przez JetBrains, znane z doskonałego wsparcia dla ekosystemu JVM i Javy. Jest to wybór wielu profesjonalnych programistów, szczególnie tych, którzy pracują nad aplikacjami korzystającymi z Spring Framework oraz JPA, dzięki wszechstronnemu i intuicyjnemu wsparciu tych technologii.

IntelliJ IDEA oferuje szereg funkcji, które ułatwiają codzienną pracę, takich jak inteligentne uzupełnianie kodu, analiza kodu w czasie rzeczywistym, automatyczne refaktoryzacje i wiele innych. Dzięki temu skomplikowane zadania stają się bardziej zrozumiałe, a proces rozwijania aplikacji na platformie Java staje się bardziej efektywny i przyjemny.

W przypadku naszej pracy nad systemem dla biura tłumaczeń, IntelliJ IDEA będzie głównym narzędziem wykorzystywanym do rozwijania części backendowej aplikacji, oferując efektywne narzędzia i wsparcie dla technologii używanych w projekcie.

Aby zainstalować IntelliJ IDEA na platformie Windows, należy przejść na stronę [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) i pobrać wersję odpowiednią dla systemu operacyjnego Windows. Po pobraniu pliku instalacyjnego, wystarczy uruchomić go i postępować zgodnie z instrukcjami pojawiającymi się w trakcie procesu instalacji. Po zakończeniu instalacji, IntelliJ IDEA będzie gotowa do użycia i dalszej konfiguracji zgodnie z preferencjami użytkownika.

#### Instalacja Git

Git to system kontroli wersji, który umożliwia efektywne śledzenie zmian w kodzie źródłowym, zapisywanie różnych wersji projektu i bezproblemowe wprowadzanie modyfikacji w kodzie. Jest to kluczowe narzędzie, które pozwala na organizację i kontrolę pracy nad kodem źródłowym podczas tworzenia systemu organizacji pracy dla biura tłumaczeń.

W tym projekcie, Git będzie używany do zapisywania różnych etapów rozwoju projektu, co pozwoli na łatwy dostęp do wcześniejszych wersji kodu i umożliwi analizę oraz modyfikację historii projektu. Dzięki temu możliwe będzie utrzymanie porządku i ciągłości pracy nad systemem, oraz precyzyjna kontrola nad każdym etapem procesu tworzenia oprogramowania.

Aby zainstalować Git na platformie Windows, najpierw trzeba pobrać instalator z oficjalnej strony [Git](https://git-scm.com/). Po pobraniu instalatora, użytkownik powinien uruchomić plik i postępować zgodnie z instrukcjami pojawiającymi się w kreatorze instalacji. Zaleca się akceptowanie domyślnych ustawień, choć doświadczeni użytkownicy mogą dostosować opcje instalacji do własnych potrzeb. Po zakończeniu instalacji, Git jest gotowy do użycia zarówno z linii poleceń, jak i za pośrednictwem dostarczonego interfejsu graficznego, takiego jak Git Bash.

### Interfejs użytkownika

#### Tworzenie projektu za pomocą Create React App

Create React App (CRA) to narzędzie do inicjalizacji projektów React, które jest utrzymane przez zespół Facebooka. Jest to oficjalnie rekomendowane narzędzie do tworzenia nowych projektów React, ponieważ automatyzuje wiele zadań konfiguracyjnych, pozwala uniknąć błędów konfiguracji, i pomaga w utrzymaniu jednolitych standardów kodowania.

`npx` to narzędzie wchodzące w skład ekosystemu Node.js, umożliwiające wykonywanie pakietów npm bez konieczności ich globalnej instalacji. Dzięki `npx`, polecenie `create-react-app` mogło zostać wykonane bezpośrednio, co znacznie upraszcza proces inicjalizacji projektu.

W trakcie inicjalizacji projektu interfejsu użytkownika systemu organizacji pracy dla biura tłumaczeń, wykorzystano szablon `typescript` przy użyciu polecenia:

```shell
npx create-react-app tpm-ui --template typescript
```

Szablony w CRA pozwalają na inicjalizację projektu z wcześniej zdefiniowaną konfiguracją oraz zestawem zależności. Szablon `typescript` dodaje do projektu konfigurację TypeScript.

Po inicjalizacji projektu otrzymaliśmy strukturę katalogów i plików zorganizowaną w sposób typowy dla projektów Create React App. Struktura ta zawiera m.in. katalog `src` zawierający pliki źródłowe aplikacji, katalog `public` z plikami statycznymi, oraz plik `package.json` definiujący zależności projektu i skrypty npm. W katalogu `src` znajdują się pliki takie jak `index.tsx`, będący punktem wejściowym aplikacji, oraz `App.tsx`, definiujący główny komponent aplikacji. Dzięki szablonowi `typescript`, wszystkie pliki źródłowe są już odpowiednio skonfigurowane do pracy z TypeScriptem. Podsumowując, struktura projektu po inicjalizacji wygląda następująco:

```
tpm-ui
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

Struktura ta jest wyjściowym punktem dla dalszego rozwoju aplikacji, umożliwiającym dodawanie nowych komponentów, modułów i funkcji, które będą implementowane w kolejnych etapach pracy nad systemem organizacji pracy dla biura tłumaczeń.

#### Instalacja dodatkowych bibliotek

W projektach opartych na Node.js, zależności są zarządzane przez plik `package.json`. Dodawanie zależności do projektu jest stosunkowo proste i odbywa się za pomocą narzędzia npm, które jest menedżerem pakietów dla Node.js.

Aby dodać zależność, używa się polecenia `npm install <nazwa_pakietu>`. Na przykład, aby dodać bibliotekę `axios`, używa się polecenia:

```sh
npm install axios
```

Wtedy, `npm` automatycznie dodaje wpis do sekcji `dependencies` w pliku `package.json` oraz instaluje odpowiednie pakiety w katalogu `node_modules`.

```json
{
  "name": "project-hermes-ui",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.54",
    "@types/react": "^18.2.22",
    "@types/react-dom": "^18.2.7",
    "axios": "^1.2.0", // Dodana zależność
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  // Pozostała część pliku
}

```
W przypadku pracy nad systemem organizacji pracy dla biura tłumaczeń, dodano szereg dodatkowych zależności, aby zapewnić wszystkie potrzebne funkcjonalności i ułatwić proces rozwoju.

- **@emoji-mart/data, @emoji-mart/react, emoji-mart**: Biblioteki do obsługi emoji.
- **@emotion/css, @emotion/react, @emotion/styled**: Biblioteki do stylizacji komponentów.
- **@fontsource/roboto, @mui/icons-material, @mui/material, @mui/x-date-pickers**: Zależności związane z Material-UI, frameworkiem do budowy interfejsów użytkownika.
- **@tinymce/tinymce-react, tinymce**: Zależności dla edytora tekstu TinyMCE.
- **ag-grid-community, ag-grid-react**: Biblioteki dla tabeli ag-Grid.
- **axios**: Biblioteka do obsługi zapytań HTTP.
- **env-cmd**: Narzędzie do zarządzania zmiennymi środowiskowymi.
- **final-form, react-final-form, yup**: Biblioteki do obsługi formularzy.
- **fs-extra, install, npm**: Narzędzia i zależności do zarządzania pakietami i systemem plików.
- **keycloak-js**: Klient Keycloak do autoryzacji i uwierzytelniania użytkownika.
- **luxon, @types/luxon**: Biblioteka do zarządzania datami i czasem.
- **react-router-dom**: Router do obsługi nawigacji w aplikacji React.
- **rxjs**: Biblioteka do programowania reaktywnego.
- **sanitize-html, @types/sanitize-html**: Biblioteka do czyszczenia i sanitizacji HTML.
- **sass**: Preprocesor CSS.
- **typescript, @types/node, @types/react, @types/react-dom, @types/jest, @types/tinymce, @types/sanitize-html**: Typy TypeScript do różnych bibliotek.

Sekcja `scripts` w pliku `package.json` została także zmodyfikowana, aby dodać różne środowiska uruchomieniowe i budowania za pomocą `env-cmd`, oraz skrypt `postinstall`.

```json
{
  "name": "project-hermes-ui",
  "version": "0.1.0",
  "private": true,
  // Sekcja dependencies
  "scripts": {
    "start:local": "env-cmd -f ./environments/local.env react-scripts start",
    "start:dev": "env-cmd -f ./environments/dev.env react-scripts start",
    "start:qa": "env-cmd -f ./environments/qa.env react-scripts start",
    "start:prod": "env-cmd -f ./environments/prod.env react-scripts start",
    "build:local": "env-cmd -f ./environments/local.env react-scripts build",
    "build:dev": "env-cmd -f ./environments/dev.env react-scripts build",
    "build:qa": "env-cmd -f ./environments/qa.env react-scripts build",
    "build:prod": "env-cmd -f ./environments/prod.env react-scripts build",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "postinstall": "node ./postinstall.ts"
  },
  // Pozostała część pliku
}
```

Projekt został dodatkowo skonfigurowany przez dodanie folderu `/assets`, zawierającego zasoby projektu takie jak czcionki i ikony. Dodano także folder `/environments`, przechowujący definicje zmiennych środowiskowych, które pozwalają na unikalną konfigurację aplikacji dla różnych środowisk, takich jak lokalne, developerskie czy produkcyjne.
Też został dodany skrypt `postinstall.ts`:

```ts
const fse = require('fs-extra');
const path = require('path');
const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(
  path.join(topDir, 'node_modules', 'tinymce'),
  path.join(topDir, 'public', 'tinymce'),
  { overwrite: true }
);

fse.emptyDirSync(path.join(topDir, 'public', 'assets'));
fse.copySync(
  path.join(topDir, 'assets'),
  path.join(topDir, 'public', 'assets'),
  { overwrite: true }
);
```

Skrypt postinstall.ts jest uruchamiany po każdej instalacji lub aktualizacji zależności npm. Automatyzuje zadania konieczne do wykonania po tych procesach, co pozwala na upewnienie się, że wszystkie potrzebne zasoby są na miejscu i są aktualne. Celem tego skryptu jest przeniesienie określonych folderów i zasobów, takich jak tinymce oraz zasobów zawartych w folderze assets, do publicznego katalogu projektu. Dzięki temu zasoby te są dostępne publicznie, co jest szczególnie ważne dla edytora tekstowego tinymce.Automatyzacja tego procesu minimalizuje ryzyko ludzkich błędów i ułatwia zarządzanie zasobami projektu, zapewniając, że są one zawsze aktualne i dostępne w odpowiednich lokalizacjach.

#### Implementacja klienta serwera aplikacji

`TpmClient` jest klasą służącą do komunikacji z backendem aplikacji, umożliwiającą wykonywanie różnych operacji na zasobach, takich jak projekty, klienci, typy klientów itd. Używa ona bibliotekę `axios` do wykonania żądań HTTP oraz `rxjs` do obsługi strumieni asynchronicznych danych. Ta klasa jest również implementowana jako singleton, co oznacza, że może istnieć tylko jedna instancja tej klasy w danej aplikacji:

```ts
private constructor() { }

private static instance: TpmClient;

static getInstance(): TpmClient {
  if (!TpmClient.instance) {
    TpmClient.instance = new TpmClient();
  }
  return TpmClient.instance;
}
```

Metoda `get` jest używana do pobierania danych z serwera. Na przykład:

```typescript
private get<TResponse>(path: string, params?: Record<string, any>): Observable<TResponse> {
  return new Observable((observer) => {
    axios.get(`${this.baseUrl}/${path}`, { params })
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}
```

Metoda `post` jest używana do wysyłania danych (takich jak JSON) na serwer, aby utworzyć nowy zasób.

```typescript
private post<TRequest, TResponse>(path: string, body: TRequest): Observable<TResponse> {
  return new Observable((observer) => {
    axios.post(`${this.baseUrl}/${path}`, body)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}
```

Metoda `postMultipart` służy do wysyłania plików i innych danych formularza za pomocą żądań HTTP POST. Można jej użyć, gdy chcemy przesłać plik lub inne dane binarne na serwer.

```typescript
private postMultipart<TResponse>(path: string, data: FormData): Observable<TResponse> {
  return new Observable((observer) => {
    axios.post(`${this.baseUrl}/${path}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}
```

Metoda `put` jest używana do aktualizacji istniejącego zasobu na serwerze. Na przykład:

```typescript
private put<TRequest, TResponse>(path: string, body: TRequest): Observable<TResponse> {
  return new Observable((observer) => {
    axios.put(`${this.baseUrl}/${path}`, body)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}
```

Metoda `patch` jest podobna do `put`, ale jest używana do aktualizacji częściowego zasobu.

```typescript
private patch<TRequest, TResponse>(path: string, body: TRequest): Observable<TResponse> {
  return new Observable((observer) => {
    axios.patch(`${this.baseUrl}/${path}`, body)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}
```

Metoda `delete` jest używana do usuwania zasobu na serwerze.

```typescript
private delete<TResponse>(path: string): Observable<TResponse> {
  return new Observable((observer) => {
    axios.delete(`${this.baseUrl}/${path}`)
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}
```

Wszystkie te metody są prywatne i są używane wewnątrz klasy do komunikacji z różnymi endpointami API, które są reprezentowane przez publiczne metody takie jak `projects()`, `clients()`, `clientTypes()`, `accuracies()`, `countries()`, `currencies()` itd:

```typescript
  projects() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Project>> => this.get("project", search),
      export: (search?: Partial<Search>): Observable<unknown> => this.get("project/export", search, { responseType: "blob" }),
      create: (body: CreateProject): Observable<Project> => this.post("project", body),
      refdata: () => {
        return {
          statuses: (): Observable<ProjectStatus[]> => this.get(`project/refdata/status`),
          teamMembers: () => {
            return {
              roles: (): Observable<ProjectRole[]> => this.get(`project/refdata/team-member/role`),
            };
          }
        };
      },
      withId: (id: string) => {
        return {
          get: (): Observable<Project> => this.get(`project/${id}`),
          update: (body: UpdateProject): Observable<Project> => this.put(`project/${id}`, body),
          moveStart: (body: ProjectMoveStart): Observable<ProjectStartMoved> => this.patch(`project/${id}/move-start`, body),
          moveDeadline: (body: ProjectMoveDeadline): Observable<ProjectDeadlineMoved> => this.patch(`project/${id}/move-deadline`, body),
          finishDraft: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/finish-draft`),
          backToDraft: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/back-to-draft`),
          startProgress: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/start-progress`),
          startReview: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/start-review`),
          approve: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/approve`),
          reject: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/reject`),
          deliver: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/deliver`),
          invoice: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/invoice`),
          pay: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/pay`),
          putOnHold: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/put-on-hold`),
          resume: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/resume`),
          cancel: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/cancel`),
          reopen: (): Observable<ProjectNewStatus> => this.patch(`project/${id}/reopen`),
          teamMembers: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<TeamMember>> => this.get(`project/${id}/team-member`, search),
              add: (body: CreateTeamMember): Observable<TeamMember> => this.post(`project/${id}/team-member`, body),
              remove: (id: string) => this.delete(`project/${id}/team-member/${id}`)
            };
          },
          tasks: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Task>> => this.get(`project/${id}/task`, search),
              export: (search?: Partial<Search>): Observable<unknown> => this.get(`project/${id}/task/export`, search, { responseType: "blob" }),
              create: (body: CreateTask): Observable<Task> => this.post(`project/${id}/task`, body),
            };
          },
          expenses: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Expense>> => this.get(`project/${id}/expense`, search),
              export: (search?: Partial<Search>): Observable<unknown> => this.get(`project/${id}/expense/export`, search, { responseType: "blob" }),
              create: (body: CreateExpense): Observable<Expense> => this.post(`project/${id}/expense`, body),
            };
          },
          threads: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Thread>> => this.get(`project/${id}/thread`, search),
              create: (body: CreateThread): Observable<Thread> => this.post(`project/${id}/thread`, body),
            };
          },
          files: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<File>> => this.get(`project/${id}/file`, search),
              export: (search?: Partial<Search>): Observable<unknown> => this.get(`project/${id}/file/export`, search, { responseType: "blob" }),
              create: (body: any) => this.postMultipart(`project/${id}/file`, body),
            };
          },
        };
      },
    };
  }

  // Pozostałe metody
```

Taka implementacja pozwala na wygodne korzystanie z klienta serwera aplikacji w komponentach React, co jest szczególnie przydatne w przypadku aplikacji, które korzystają z wielu zasobów API. Na przykład, aby pobrać wszystkie projekty, można użyć:

```tsx
const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  const subscription = TpmClient.getInstance().projects().all().subscribe((page) => {
    setProjects(page.content);
  });
  return () => subscription.unsubscribe();
}, []);
```

#### Implementacja komponentów

W projekcie React, dobrze zorganizowana struktura katalogów i spójna organizacja komponentów są kluczowe dla skalowalności i utrzymywalności kodu. Komponenty są fundamentalnymi elementami architektury React i umożliwiają budowanie zaawansowanych, responsywnych interfejsów użytkownika. 
Warto zaznaczyć, że w React istnieją głównie dwa typy komponentów: klasowe i funkcyjne. Komponenty klasowe były bardzo popularne w wcześniejszych wersjach biblioteki, oferując pełny dostęp do cyklu życia komponentu oraz stanu.
Jednak od wprowadzenia hooków w React 16.8, komponenty funkcyjne stały się bardziej elastyczne i potężne, umożliwiając korzystanie ze stanu i innych funkcji życia komponentu, które wcześniej były dostępne tylko dla komponentów klasowych. Dzięki hookom, komponenty funkcyjne są teraz zalecane jako standardowy sposób tworzenia komponentów w React, oferując bardziej zwięzły i zrozumiały sposób na budowanie interfejsów użytkownika.
Obecnie, korzystanie z komponentów klasowych jest uważane za przestarzałe, i nie są one rekomendowane do użycia w nowych projektach. Jednak wciąż można spotkać je w starszych projektach, dlatego ważne jest, aby znać różnice między komponentami klasowymi a funkcyjnymi oraz umieć pracować z oboma typami.
W przykładzie poniżej, `useState` jest hookiem, który pozwala korzystać ze stanu wewnątrz komponentu funkcyjnego. Jest to jeden z wielu hooków dostarczanych przez React, które umożliwiają efektywne zarządzanie stanem i cyklem życia komponentu.

```jsx
// Przykładowy komponent funkcyjny z hookiem stanu
import React, { useState } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

W projekcie systemu organizacji pracy komponenty są umieszczone w katalogu `/src/components`. Utrzymanie komponentów w dedykowanym katalogu jest istotne dla zachowania klarowności i porządku w strukturze projektu. W projekcie komponenty pełnią dwie główne role:

1. **Adaptery do Zewnętrznych Komponentów:** Dzięki adapterom możliwe jest dostosowanie zewnętrznych komponentów do specyficznych wymagań projektowych, zarówno pod kątem funkcjonalności, jak i prezentacji. Korzystanie z adapterów pozwala na utrzymanie spójności API i ułatwia integrację z resztą systemu. Dodatkowo, ułatwiają one wprowadzanie zmian, izolując potencjalne modyfikacje w przypadku aktualizacji lub zastąpienia używanej biblioteki. Dzięki nim, developerzy mają także większą kontrolę nad stylami i zachowaniem komponentów, umożliwiając precyzyjne dostosowanie ich do projektu. Przykładem takiego adaptera jest `SelectField.tsx`, który opakowuje komponent `Select` z biblioteki `@mui/material` i dostosowuje go do użycia w aplikacji. Używa on komponentu `Field` z biblioteki `react-final-form` do zarządzania stanem pola formularza, oraz komponentów `FormControl`, `InputLabel`, `Select` i `MenuItem` z biblioteki `@mui/material` do prezentacji.
```tsx
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'react-final-form';

export interface SelectFieldProps {
  name: string;
  label: string;
  multiple?: boolean;
  required?: boolean;
  defaultValue?: [];
  options: { key: string, value: string }[];
}

export const SelectField = (props: SelectFieldProps) => {
  const { name, label, multiple, required, options } = props;
  const labelId = `${name}-label`;

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <FormControl variant="outlined" fullWidth margin="normal" error={meta.error && meta.touched}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...input}
            label={label}
            labelId={labelId}
            displayEmpty
            multiple={multiple}
            required={required}
            inputProps={{ name: label, id: label }}
          >
            {
              options.map(option => (
                <MenuItem key={option.key} value={option.key}>
                  {option.value}
                </MenuItem>
              ))
            }
          </Select>
          <FormHelperText>{meta.error && meta.touched && meta.error}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
}
```

2. **Reużywalne Komponenty Własne:** Komponenty są również reużywalnymi elementami interfejsu, często używanymi w różnych miejscach aplikacji. Takie podejście promuje zasadę DRY (Don't Repeat Yourself) i pomaga w utrzymaniu kodu. Przykładem takiego komponentu jest `SecuredComponent.tsx`, który warunkowo renderuje swoje dzieci w zależności od ról użytkownika, służąc jako mechanizm zabezpieczający i kontrolujący dostęp.
```tsx
import { ReactNode } from "react";
import { Role, useAuth } from "../../contexts/AuthContext";

export interface SecuredComponentProps {
  roles?: Role[];
  children: ReactNode;
}

export const SecuredComponent = ({ roles, children }: SecuredComponentProps) => {
  const { hasAnyRole } = useAuth();

  return roles && hasAnyRole(roles) ? <>{children}</> : null;
}
```

#### Implementacja kontekstów

Konteksty w React to mechanizm, który pozwala na przechowywanie i udostępnianie danych dla różnych komponentów w drzewie komponentów. Jest to szczególnie użyteczne, gdy dane, takie jak dane uwierzytelniające użytkownika, są konieczne w wielu różnych miejscach w aplikacji. Użycie kontekstów eliminuje potrzebę przekazywania danych za pomocą propsów przez wiele poziomów komponentów, co sprawia, że kod jest bardziej zwięzły i łatwiejszy do zarządzania.

`AuthContext.tsx` jest przykładem implementacji kontekstu, który przechowuje informacje o uwierzytelnieniu użytkownika, takie jak identyfikator użytkownika, imię, nazwisko, email, role oraz metody umożliwiające sprawdzenie ról użytkownika. Kontekst korzysta z biblioteki Keycloak do uwierzytelniania i zarządzania tożsamością. Początek implementacji odpowiada za inicjalizację Keycloak:

```typescript
const keycloakConfig: KeycloakConfig = {
  realm: "tpm",
  clientId: "tpm-frontend",
  url: environment.authServerUrl,
};

const keycloak = new Keycloak(keycloakConfig);
```

AuthContext jest tworzony przy użyciu `createContext` z domyślnymi wartościami, które są stanem początkowym dla komponentu `AuthContextProvider`. Kod niżej deklaruje typ `Role`, który jest typem wyliczeniowym, reprezentującym role użytkownika w systemie. Następnie, deklarowany jest interfejs `AuthContextValues`, który zawiera wszystkie dane uwierzytelniające użytkownika oraz metody do zarządzania kontekstem. Na końcu, tworzony jest kontekst przy użyciu `createContext` i eksportowany jako `AuthContext`. 

```typescript
export type Role = "admin"
  | "project-manager"
  | "translator"
  | "editor"
  | "proofreader"
  | "subject-matter-expert"
  | "publisher"
  | "observer"
  | "user";

interface AuthContextValues {
  isAuthenticated: boolean;
  logout: () => void;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
}

const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  logout: () => {},
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
  hasRole: (role: Role) => false,
  hasAnyRole: (roles: Role[]) => false
};

export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);
```

`AuthContextProvider` jest komponentem funkcyjnym, który implementuje `AuthContext` i udostępnia go do swoich dzieci. Komponent ten jest odpowiedzialny za inicjalizację Keycloak, zarządzanie stanem uwierzytelnienia oraz dostarczanie danych uwierzytelniających użytkownika do kontekstu. Komponent ten jest również odpowiedzialny za dodanie tokena uwierzytelniającego do nagłówka każdego zapytania HTTP, aby umożliwić dostęp do chronionych zasobów API. Komponent ten jest również odpowiedzialny za obsługę błędów zapytań HTTP, takich jak błąd 401, który oznacza, że token uwierzytelniający wygasł i należy wykonać ponowne uwierzytelnienie. W takim przypadku, komponent ten wywołuje metodę `updateToken` z Keycloak, aby uzyskać nowy token, a następnie wykonuje ponownie zapytanie HTTP. Jeśli token nie może zostać odświeżony, użytkownik jest wylogowywany z aplikacji. Poniżej znajduje się kod komponentu `AuthContextProvider`:

```tsx
interface AuthContextProviderProps {
  children: JSX.Element;
}

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [initialized, setInitialized] = useState<boolean>(false);

  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roles, setRoles] = useState<Role[]>([]);

  const keycloakInitOptions: KeycloakInitOptions = {
    onLoad: "login-required",
    flow: "standard"
  };

  useEffect(() => {
    keycloak.init(keycloakInitOptions)
      .then((authenticated) => {
        if (!authenticated) {
          keycloak.login();
        }

        setAuthenticated(authenticated);
        setUserId(keycloak.tokenParsed?.sub || "");
        setUsername(keycloak.tokenParsed?.preferred_username);
        setFirstName(keycloak.tokenParsed?.given_name);
        setLastName(keycloak.tokenParsed?.family_name);
        setEmail(keycloak.tokenParsed?.email);
        setRoles(keycloak.tokenParsed?.realm_access?.roles as Array<Role> || []);

        axios.interceptors.request.use(
          (config) => {
            config.headers ??= {};
            config.headers["Authorization"] = `Bearer ${keycloak.token}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        axios.interceptors.response.use(
          (response) => response,
          (error) => {
            if (error.response === undefined) {
              return Promise.reject(error);
            }
            if (error.response.status === 401) {
              return keycloak.updateToken(5)
                .then((result) => {
                  if (result === true) {
                    return axios({ ...error.config });
                  } else {
                    return Promise.reject(new Error("Unauthorized"));
                  }
                })
                .catch((error) => {
                  keycloak.logout();
                  return Promise.reject(error);
                });
            }
            return Promise.reject(error);
          },
        );

        setInitialized(true);
      })
      .catch((error) => {
        setAuthenticated(false);
        setInitialized(true);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setUserId(keycloak.tokenParsed?.sub || "");
      setUsername(keycloak.tokenParsed?.preferred_username);
      setFirstName(keycloak.tokenParsed?.given_name);
      setLastName(keycloak.tokenParsed?.family_name);
      setEmail(keycloak.tokenParsed?.email);
      setRoles(keycloak.tokenParsed?.realm_access?.roles as Array<Role> || []);
    }
  }, [isAuthenticated]);

  const logout = () => {
    keycloak.logout();
  };

  const hasRole = (role: Role) => {
    return roles.includes(role);
  };

  const hasAnyRole = (roles: Role[]) => {
    return roles.some(role => hasRole(role));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, userId, username, firstName, lastName, email, roles, hasRole, hasAnyRole }}>
      { initialized ? props.children : <LoadingScreen /> }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
```

Aby skorzystać z `AuthContextProvider`, umieśzcza się go w drzewie komponentów, tak aby otaczał komponenty, które mają mieć dostęp do kontekstu uwierzytelnienia. Zazwyczaj jest to osiągane przez umieszczenie go blisko korzenia drzewa komponentów. W przypadku systemu organizacji pracy, `AuthContextProvider` jest umieszczony w komponencie `Root`, który jest korzeniem drzewa komponentów aplikacji. Poniżej znajduje się kod komponentu `Root.tsx`:

```tsx
// import pozostałych komponentów i kontekstów pominięty dla czytelności

const Root = () => {
  const { theme } = useThemeContext();
  const currentTheme = useMemo(() => theme === "dark" ? darkTheme : lightTheme, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthContextProvider>
          <TpmClientContextProvider>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <BreadcrumbsContextProvider>
                <SnackbarContextProvider>
                  <StrictMode>
                    <App />
                  </StrictMode>
                </SnackbarContextProvider>
              </BreadcrumbsContextProvider>
            </LocalizationProvider>
          </TpmClientContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeContextProvider>
    <Root />
  </ThemeContextProvider>
);
```

Kolejnym krokiem jest utworzenie hooka `useAuth`, który pozwala na łatwy dostęp do kontekstu uwierzytelnienia w komponentach. Hook useAuth jest implementowany jako funkcja, która wywołuje `useContext` z kontekstem uwierzytelnienia i zwraca jego wartość. Jeśli kontekst nie istnieje, hook `useAuth` wyrzuca błąd. Poniżej znajduje się kod hooka `useAuth`:

```typescript
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
}
```

Dzięki hookowi `useAuth`, komponenty zagnieżdżone wewnątrz `AuthContextProvider` mogą łatwo uzyskać dostęp do kontekstu uwierzytelnienia oraz funkcji do manipulowania nim, jak na przykład wyżej w komponencie `SecuredComponent.tsx`. Przy użyciu `useAuth`, komponenty mają dostęp do informacji uwierzytelniających oraz funkcji takich jak `logout`, `hasRole` i `hasAnyRole`, które ułatwiają zarządzanie stanem uwierzytelnienia w różnych częściach aplikacji.

Na koniec też warto wspomnieć że istnieje wiele alternatywnych rozwiązań do kontekstów, takich jak Redux, które są bardziej odpowiednie dla dużych aplikacji. Redux też był rozważany jako rozwiązanie do zarządzania stanem w systemie organizacji pracy, ale ostatecznie zdecydowano się na konteksty, ponieważ są one prostsze w użyciu i wystarczające dla potrzeb projektu.

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
