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
  * [Infrastruktura](#infrastruktura)
    * [Docker Compose](#docker-compose)
    * [Konfiguracja instancji PostgreSQL](#konfiguracja-instancji-postgresql)
    * [Konfiguracja instancji Redis](#konfiguracja-instancji-elasticsearch)
    * [Konfiguracja instancji MinIO](#konfiguracja-instancji-minio)
    * [Konfiguracja instancji Keycloak](#konfiguracja-instancji-keycloak)
    * [Konfiguracja stosu ELK](#konfiguracja-stosu-elk)
  * [Interfejs użytkownika](#interfejs-użytkownika-1)
    * [Tworzenie projektu za pomocą Vite](#tworzenie-projektu-za-pomocą-vite)
    * [Zarządzanie zależnościami za pomocą narzędzia npm](#zarządzanie-zależnościami-za-pomocą-narzędzia-npm)
    * [Wyznaczenie kluczowych elementów interfejsu](#wyznaczenie-kluczowych-elementów-interfejsu)
    * [Uwierzytelnianie i kontrola dostępu](#uwierzytelnianie-i-kontrola-dostępu)
    * [Lokalizacja](#lokalizacja)
    * [Nawigacja i routing](#nawigacja-i-routing)
    * [Komunikacja z serwerem](#komunikacja-z-serwerem)
    * [Implementacja widoków](#implementacja-widoków)
    * [Implementacja formularzy](#implementacja-formularzy)
    * [Wdrożenie aplikacji](#wdrożenie-aplikacji)
  * [Serwer aplikacji](#serwer-aplikacji-1)
    * [Tworzenie projektu za pomocą Spring Initializr](#tworzenie-projektu-za-pomocą-spring-initializr)
    * [Narzędzie Gradle](#narzędzie-gradle)
    * [Warstwa domeny aplikacji](#warstwa-domeny-aplikacji)
    * [Uwierzytelnianie i kontrola dostępu](#uwierzytelnianie-i-kontrola-dostępu-1)
    * [Komunikacja z bazą danych](#komunikacja-z-bazą-danych)
    * [Komunikacja z serwisami zewnętrznymi](#komunikacja-z-serwisami-zewnętrznymi)
    * [Implementacja logowania i monitorowania](#implementacja-logowania-i-monitorowania)
    * [Testowanie](#testowanie-1)
    * [Wdrożenie aplikacji](#wdrożenie-aplikacji-1)
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

### Infrastruktura

#### Docker Compose

Docker Compose to narzędzie do definiowania i uruchamiania wielokontenerowych aplikacji Docker. Umożliwia użytkownikowi definiowanie całego ekosystemu aplikacji, składającego się z wielu serwisów, w jednym pliku YAML. Dzięki temu możliwe jest jednoczesne uruchamianie wszystkich serwisów z jednym poleceniem (`docker-compose up`).

Plik `docker-compose.yml` to standardowy plik konfiguracyjny używany przez Docker Compose do definiowania i uruchamiania wielokontenerowych aplikacji Docker. Jest napisany w formacie YAML i umożliwia definiowanie różnych aspektów infrastruktury aplikacji.

Kluczowe sekcje w pliku `docker-compose.yml` to:

1. **services**: Sekcja ta definiuje kontenery, które mają być uruchomione w ramach danej kompozycji. Każdy serwis reprezentuje kontener i opiera się na obrazie Docker:
    ```yaml
    services:
      web:
        image: nginx:latest
        ports:
          - "8080:80"
      database:
        image: postgres:latest
        environment:
          POSTGRES_DB: mydatabase
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
    ```
    W powyższym przykładzie definiujemy dwa serwisy: `web` oparty na obrazie `nginx` oraz `database` oparty na obrazie `postgres`. W ramach projektu poszczególne serwisy będą reprezentować instancje różnych narzędzi

2. **networks**: Sekcja ta pozwala na definiowanie własnych sieci dla kontenerów. Dzięki temu można izolować komunikację między kontenerami lub połączyć je w określony sposób:
    ```yaml
    networks:
      frontend:
      backend:
    ```
    Możemy następnie przypisać te sieci do określonych serwisów:
    ```yaml
    services:
      web:
        image: nginx:latest
        networks:
          - frontend
      database:
        image: postgres:latest
        networks:
          - backend
      ```

3. **volumes**: Sekcja ta umożliwia definiowanie woluminów, które pozwalają na trwałe przechowywanie danych poza kontenerami. Jest to kluczowe dla baz danych, aby dane nie były tracone po zniszczeniu kontenera:
    ```yaml
    volumes:
      db-data:
    ```
    Podobnie jak w przypadku sieci, można następnie przypisać te woluminy do określonych serwisów:
    ```yaml
    services:
      database:
        image: postgres:latest
        volumes:
          - db-data:/var/lib/postgresql/data
    ```

Każda z tych sekcji pozwala na definiowanie kluczowych aspektów kompozycji wielokontenerowej aplikacji. Korzystając z nich, można zapewnić właściwą komunikację między kontenerami, trwałe przechowywanie danych oraz precyzyjne definiowanie zależności i konfiguracji każdego kontenera. Inicjalizacje projektu zaczniemy od tworzenia katalogu, umieszczając w nim plik `docker-compose.yml` z podstawową konfiguracją:

```yaml
version: "3.8"

services:

volumes:

networks:
  tpm-network:
    driver: bridge

```

Wykorzystanie Docker Compose w projekcie ma na celu uproszczenie procesu konfiguracji środowiska developerskiego oraz zapewnienie spójności środowiska między programistami. Poniżej kilka kluczowych korzyści wynikających z zastosowania Docker Compose:

1. **Kod jako infrastruktura**: Dzięki Docker Compose cała infrastruktura jest zdefiniowana w postaci kodu, co sprawia, że jest ona łatwo powtarzalna, przenośna i wersjonowana. Wszystkie zależności, konfiguracje i inne ustawienia są jasno określone w pliku `docker-compose.yml`.
2. **Eliminacja "u mnie działa"**: Problem różnic w środowiskach developerskich jest dobrze znany w branży IT. Docker Compose minimalizuje ten problem, gwarantując, że wszyscy programiści pracują na identycznym środowisku.
3. **Szybkie wdrażanie i przywracanie środowiska**: W przypadku problemów z konfiguracją lub uszkodzeniem środowiska, zamiast tracić godziny na diagnozowanie i naprawę, programista może szybko zniszczyć i ponownie uruchomić wszystkie kontenery za pomocą kilku poleceń (`docker-compose down` i `docker-compose up`). Jeśli problem dotyczy konkretnego kontenera, istnieje również możliwość ponownego uruchomienia tylko tego kontenera. Dodatkowo, przy użyciu woluminów, dane, takie jak bazy danych, mogą być zachowane nawet po zniszczeniu kontenera, a w razie potrzeby można też przywrócić konkretne woluminy lub sieci do ich pierwotnego stanu.
4. **Onboarding nowych programistów**: Wprowadzenie nowego członka zespołu jest znacznie uproszczone, niezależnie od tego, czy pracuje on w biurze, czy zdalnie. Wystarczy sklonować repozytorium i uruchomić `docker-compose up`, aby natychmiast mieć działające środowisko developerskie. Dzięki temu zminimalizowane są potencjalne problemy z różnicami w konfiguracji lokalnych maszyn, co jest szczególnie ważne w środowiskach zdalnych, gdzie fizyczna pomoc innych członków zespołu może być utrudniona.

W kontekście współczesnego rozwoju oprogramowania, gdzie złożoność technologiczna i liczba zależności ciągle rośnie, narzędzia takie jak Docker Compose stają się niezbędne. W tym projekcie Docker Compose pełni kluczową rolę, umożliwiając łatwe zarządzanie, konfigurację i izolację różnych serwisów potrzebnych do działania aplikacji.

#### Konfiguracja instancji PostgreSQL

Baza danych jest kluczowym składnikiem większości aplikacji. W systemie organizacji pracy dla biura tłumaczeń zostanie wykorzystany PostgreSQL - popularny system zarządzania relacyjnymi bazami danych. Konfiguracja bazy danych dla systemu składa się z kilku kroków:

1. **Plik Dockerfile**

    Plik `db.Dockerfile` w katalogu `db` definiuje obraz kontenera dla instancji PostgreSQL:

    ```Dockerfile
    FROM postgres:15.3-alpine

    ENV POSTGRES_USER=admin
    ENV POSTGRES_PASSWORD=1qaz@WSX

    COPY ./init.sql /docker-entrypoint-initdb.d/init.sql

    EXPOSE 5432

    CMD ["postgres"]
    ```

    Krótkie objaśnienie poszczególnych sekcji:

    - `FROM postgres:15.3-alpine`: Obraz bazowy, na którym zostanie oparty kontener. W tym przypadku jest to `postgres:15.3-alpine`, który jest oficjalnym obrazem PostgreSQL opartym na Alpine Linux.
    - `ENV POSTGRES_USER` i `ENV POSTGRES_PASSWORD`: Zmienne środowiskowe, które zostaną użyte do utworzenia użytkownika i hasła dla bazy danych.
    - `COPY ./init.sql /docker-entrypoint-initdb.d/init.sql`: Kopiowanie pliku `init.sql` do katalogu `/docker-entrypoint-initdb.d/` w kontenerze. Plik ten zawiera instrukcje SQL, które zostaną wykonane podczas pierwszego uruchomienia kontenera w celu skonfigurowania bazy danych.
    - `EXPOSE 5432`: Mapowanie portu 5432, na którym działa serwer PostgreSQL, aby był dostępny z zewnątrz.
    - `CMD ["postgres"]`: Komenda, która zostanie wykonana po uruchomieniu kontenera. W tym przypadku jest to `postgres`, czyli komenda, która uruchamia serwer PostgreSQL.

2. **Skrypt inicjalizacyjny**

    Plik `init.sql` zawiera instrukcje SQL, które są automatycznie wykonane podczas pierwszego uruchomienia kontenera. Pozwala to na automatyczne skonfigurowanie struktury bazy danych oraz przyznanie odpowiednich uprawnień dla użytkowników:

    ```sql
    CREATE USER "application" WITH PASSWORD '1qaz@WSX';
    CREATE USER "keycloak" WITH PASSWORD '1qaz@WSX';

    CREATE DATABASE "tpm";
    GRANT CONNECT, TEMPORARY ON DATABASE "tpm" TO "application";
    GRANT CONNECT, TEMPORARY ON DATABASE "tpm" TO "keycloak";

    \c tpm

    CREATE SCHEMA IF NOT EXISTS "application";
    GRANT ALL PRIVILEGES ON SCHEMA "application" TO "application";

    CREATE SCHEMA IF NOT EXISTS "keycloak";
    GRANT ALL PRIVILEGES ON SCHEMA "keycloak" TO "keycloak";

    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ```

    W przypadku systemu organizacji pracy dla biura tłumaczeń, skrypt inicjalizacyjny tworzy dwóch użytkowników: `application` oraz `keycloak`, którzy będą używani przez aplikację oraz serwer Keycloak. Następnie tworzy schematy `application` i `keycloak`, które będą używane przez aplikację oraz serwer Keycloak i przyznaje odpowiednie uprawnienia dla użytkowników. Na koniec, skrypt tworzy rozszerzenie `uuid-ossp`, które będzie używane przez aplikację do generowania identyfikatorów UUID.

3. **Definicja serwisu**

    W pliku `docker-compose.yml` do sekcji `services` należy dodać definicję serwisu dla bazy danych:

    ```yaml
    services:
      db:
        container_name: db
        build:
          context: ./db
          dockerfile: ./db.Dockerfile
        ports:
          - "5432:5432"
        networks:
          - tpm-network
        volumes:
          - db-data:/var/lib/postgresql/data
        healthcheck:
          test: ["CMD", "pg_isready", "-U", "postgres"]
          interval: 30s
          timeout: 5s
          retries: 5
    ```

    Ważne aspekty konfiguracji serwisu:
    - `container_name`: Definicja nazwy kontenera.
    - `build`: Definicja sposobu budowania obrazu kontenera. W tym przypadku zostanie użyty plik `db.Dockerfile` znajdujący się w katalogu `db`.
    - `ports`: Mapowanie portów. W tym przypadku port 5432 kontenera zostanie udostępniony na porcie 5432 maszyny-hosta.
    - `networks`: Przypisanie kontenera do sieci `tpm-network`.
    - `volumes`: Mapowanie woluminu `db-data` do katalogu `/var/lib/postgresql/data` w kontenerze.
    - `healthcheck`: Definicja testu sprawdzającego stan kontenera. W tym przypadku sprawdzana jest dostępność serwera PostgreSQL.

    Konfiguracja woluminu z kolei jest bardzo prosta, wystarczy dodać definicję woluminu do sekcji `volumes`:

    ```yaml
    volumes:
      db-data:
    ```

    W ten sposób, wolumin `db-data` zostanie utworzony i będzie dostępny dla kontenera `db`.

Konfiguracja instancji PostgreSQL w kontenerze Docker może wydawać się skomplikowana, ale poprzez podzielenie jej na logiczne kroki i jasne objaśnienie każdego z nich, proces ten staje się prosty i przejrzysty. Dzięki takiej konfiguracji, zyskujemy pewność, że baza danych jest nie tylko izolowana i łatwa w zarządzaniu, ale także łatwo reproducyjna, co jest nieocenione w środowiskach produkcyjnych. Ponadto, wykorzystanie Dockera zapewnia elastyczność i skalowalność, dzięki czemu można łatwo dostosować się do rosnących wymagań systemu i zapewnić niezawodność na najwyższym poziomie.

#### Konfiguracja instancji Redis

Redis to bardzo popularna, otwartoźródłowa baza danych typu klucz-wartość, która oferuje szybkie operacje na danych. W systemie organizacji pracy dla biura tłumaczeń zostanie wykorzystana instancja Redis do celów cache'owania i tymczasowego przechowywania danych. Konfiguracja tej instancji odbywa się w kilku krokach:

1. **Plik Dockerfile**

    Plik `cache.Dockerfile` w katalogu `cache` definiuje obraz kontenera dla instancji Redis:

    ```Dockerfile
    FROM redis/redis-stack-server:6.2.6-v9

    EXPOSE 6379

    CMD redis-server --requirepass 1qaz@WSX
    ```

    Krótkie objaśnienie poszczególnych sekcji:

    - `FROM redis/redis-stack-server:6.2.6-v9`: Wykorzystanie oficjalnego obrazu Redis o określonej wersji jako bazowy dla kontenera.
    - `EXPOSE 6379`: Eksponowanie portu 6379, standardowego portu dla Redis, dzięki czemu będzie on dostępny z zewnątrz kontenera.
    - `CMD redis-server --requirepass 1qaz@WSX`: Instrukcja uruchamiająca serwer Redis z wymaganym hasłem dostępu.

2. **Definicja serwisu**

    W pliku `docker-compose.yml` do sekcji `services` należy dodać definicję serwisu dla instancji Redis:

    ```yaml
    services:
      cache:
        container_name: cache
        build:
          context: ./cache
          dockerfile: ./cache.Dockerfile
        ports:
          - "6379:6379"
        networks:
          - tpm-network
        volumes:
          - cache-data:/data
    ```

    Ważne aspekty konfiguracji serwisu:
    - `container_name`: Określa nazwę kontenera.
    - `build`: Określa, w jaki sposób obraz kontenera zostanie zbudowany. Tutaj wskazujemy na plik `cache.Dockerfile` znajdujący się w katalogu `cache`.
    - `ports`: Mapuje port 6379 kontenera do portu 6379 maszyny-hosta.
    - `networks`: Przypisuje kontener do sieci `tpm-network`.
    - `volumes`: Mapuje wolumin `cache-data` do katalogu `/data` w kontenerze.

    Aby zapewnić trwałość danych, wolumin `cache-data` zostanie użyty do przechowywania danych w instancji Redis, o czym mówi sekcja `volumes`:

    ```yaml
    volumes:
      cache-data:
    ```

Konfiguracja instancji Redis jest prosta i zwięzła. Dzięki wykorzystaniu Dockera możemy w szybki sposób uruchomić i skonfigurować serwer Redis, który będzie służył jako mechanizm cache'owania w naszym systemie. Całość konfiguracji opiera się na dwóch głównych elementach: pliku Dockerfile i definicji serwisu w `docker-compose.yml`. Po prawidłowej konfiguracji, serwer Redis jest gotowy do użycia z bezpiecznym hasłem dostępu i możliwością przechowywania danych w sposób trwały dzięki woluminom.

#### Konfiguracja instancji MinIO

MinIO jest wysoko wydajnym, otwartoźródłowym serwerem przechowywania obiektowego, który jest zgodny z Amazon S3. W systemie organizacji pracy dla biura tłumaczeń, MinIO będzie wykorzystywany jako lokalne rozwiązanie do przechowywania plików. Konfiguracja tej instancji obejmuje kilka kroków:

1. **Plik Dockerfile**

    Plik `file-storage.Dockerfile` w katalogu `file-storage` opisuje obraz kontenera dla instancji MinIO:

    ```Dockerfile
    FROM quay.io/minio/minio:RELEASE.2023-03-24T21-41-23Z

    ENV MINIO_ROOT_USER=admin
    ENV MINIO_ROOT_PASSWORD=1qaz@WSX

    EXPOSE 9000 9001

    RUN mkdir -p /data

    COPY entrypoint.sh /entrypoint.sh

    RUN chmod +x /entrypoint.sh

    ENTRYPOINT ["/entrypoint.sh"]
    ```

    Krótkie objaśnienie poszczególnych sekcji:

    - `FROM quay.io/minio/minio:RELEASE.2023-03-24T21-41-23Z`: Wykorzystuje określony obraz MinIO jako bazowy dla kontenera.
    - `ENV MINIO_ROOT_USER` i `ENV MINIO_ROOT_PASSWORD`: Zmienne środowiskowe definiujące głównego użytkownika i hasło dla serwera MinIO.
    - `EXPOSE 9000 9001`: Eksponuje porty 9000 i 9001 używane przez MinIO.
    - `RUN mkdir -p /data`: Tworzy katalog, który będzie używany do przechowywania danych.
    - `COPY` i `RUN`: Kopiuje i nadaje uprawnienia do wykonania pliku `entrypoint.sh`, który będzie używany jako punkt wejściowy do kontenera.

2. **Plik entrypoint.sh**

    Plik `entrypoint.sh` opisuje instrukcje, które zostaną wykonane podczas uruchamiania kontenera:

    ```bash
    #!/bin/sh
    "$@" &
    minio server --address "0.0.0.0:9000" --console-address "0.0.0.0:9001" /data
    ```

    Ten skrypt uruchamia serwer MinIO na adresie `0.0.0.0:9000` oraz konsolę zarządzania MinIO na adresie `0.0.0.0:9001`.

3. **Definicja serwisu**

    Definicja serwisu w pliku `docker-compose.yml` dla instancji MinIO:

    ```yaml
    services:
      file-storage:
        container_name: file-storage
        build:
          context: ./file-storage
          dockerfile: ./file-storage.Dockerfile
        ports:
          - "9000:9000"
          - "9001:9001"
        networks:
          - tpm-network
        volumes:
          - ./file-storage/entrypoint.sh:/entrypoint.sh:ro,Z
          - file-storage-data:/data
    ```

    Kluczowe elementy tej definicji to mapowanie portów, przypisanie kontenera do sieci `tpm-network`, oraz mapowanie woluminów, które zapewniają trwałość danych oraz dostępność skryptu `entrypoint.sh` w kontenerze.

Konfiguracja instancji MinIO pozwala na szybkie wdrożenie lokalnego rozwiązania przechowywania plików w zgodzie ze standardem Amazon S3. Dzięki jasnym definicjom Dockerfile oraz skryptowi `entrypoint.sh`, proces uruchamiania serwera jest transparentny i łatwo konfigurowalny. Wykorzystując Docker, można z łatwością zintegrować MinIO z innymi usługami w systemie, zapewniając wydajne i niezawodne przechowywanie danych.

#### Konfiguracja instancji Keycloak

Keycloak to otwarte oprogramowanie do zarządzania tożsamością i dostępem, które umożliwia uwierzytelnianie i autoryzację użytkowników. W systemie organizacji pracy dla biura tłumaczeń, Keycloak służy jako centralny serwer uwierzytelniania, który zarządza tożsamościami użytkowników i zapewnia bezpieczny dostęp do zasobów.

Konfiguracja obejmuje:

1. **Plik Dockerfile**

    Plik `auth-server.Dockerfile` w katalogu `auth-server` definiuje obraz kontenera dla instancji Keycloak:

    ```Dockerfile
    FROM quay.io/keycloak/keycloak:22.0.1 AS builder

    ENV KC_HEALTH_ENABLED=true
    ENV KC_METRICS_ENABLED=true
    ENV KC_DB=postgres

    WORKDIR /opt/keycloak
    # use proper certificate for production
    RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
    RUN /opt/keycloak/bin/kc.sh build

    FROM quay.io/keycloak/keycloak:22.0.1
    COPY --from=builder /opt/keycloak /opt/keycloak

    ENV KC_PROXY=edge
    ENV KC_HOSTNAME_STRICT=false
    ENV KC_HOSTNAME_STRICT_HTTPS=false

    ENV KC_DB=postgres
    ENV KC_DB_URL=jdbc:postgresql://db:5432/tpm
    ENV KC_DB_SCHEMA=keycloak
    ENV KC_DB_USERNAME=keycloak
    ENV KC_DB_PASSWORD=1qaz@WSX

    ENV KEYCLOAK_ADMIN=admin
    ENV KEYCLOAK_ADMIN_PASSWORD=1qaz@WSX

    COPY ./realm.json /opt/keycloak/data/import/realm.json

    EXPOSE 8080
    EXPOSE 8443

    ENTRYPOINT [ \
        "/opt/keycloak/bin/kc.sh", \
        "start", \
        "--optimized", \
        "--import-realm" \
    ]
    ```

    Ważne elementy tego Dockerfile to:

    - Używanie dwóch etapów budowy: `builder` do tworzenia klucza i budowy, oraz głównego obrazu, który kopi
    uje wyniki z etapu budowy.
    - Generowanie klucza dla serwera za pomocą `keytool`.
    - Ustawianie zmiennych środowiskowych dla konfiguracji Keycloak, takich jak parametry bazy danych, nazwa i hasło administratora, oraz parametry związane z proxy i certyfikatami.
    - Kopiowanie konfiguracji domeny (realm) z pliku `realm.json`.
    - Określenie punktu wejścia, który uruchamia Keycloak z optymalizacjami i importuje konfigurację domeny.

2. **Definicja serwisu**

    Definicja serwisu w pliku `docker-compose.yml` dla instancji Keycloak:

    ```yaml
    services:
      auth-server:
        container_name: auth-server
        build:
          context: ./auth-server
          dockerfile: ./auth-server.Dockerfile
        ports:
          - "8081:8080"
          - "8082:8443"
        networks:
          - tpm-network
        depends_on:
          - db
          - logstash
    ```

    Warto zauważyć, że serwis `auth-server` zależy od serwisów `db` i `logstash`.

Za pomocą powyższej konfiguracji, Keycloak zostanie skonfigurowany do działania jako serwer uwierzytelniania w środowisku Docker. Zostały uwzględnione ważne aspekty takie jak konfiguracja bazy danych, administratora, certyfikatów oraz zależności serwisów. Dzięki Dockerowi, proces wdrożenia i zarządzania instancją Keycloak staje się znacznie bardziej uproszczony i łatwy w utrzymaniu.

#### Konfiguracja stosu ELK

ELK to popularny stos składający się z Elasticsearch (przeszukiwanie i przechowywanie), Logstash (przetwarzanie i przesyłanie logów) oraz Kibana (wizualizacja danych). W systemie organizacji pracy dla biura tłumaczeń, stos ELK będzie wykorzystywany do przetwarzania logów aplikacji i przechowywania ich w centralnym repozytorium.

Konfiguracja obejmuje:

1. **Pseudousługa monitoring-setup**

    Psuedousługa `monitoring-setup` jest usługą, która uruchamia się tylko raz, podczas pierwszego uruchomienia stosu ELK. Jej zadaniem jest skonfigurowanie indeksów, szablonów i innych elementów wymaganych do prawidłowego działania stosu ELK. Definicja tej usługi w pliku `docker-compose.yml`:

    ```yaml
    services:
      monitoring-setup:
        container_name: monitoring-setup
        build:
          context: ./monitoring/setup
          dockerfile: ./setup.Dockerfile
          args:
            ELASTIC_VERSION: ${ELASTIC_VERSION}
        init: true
        volumes:
          - ./monitoring/setup/entrypoint.sh:/entrypoint.sh:ro,Z
          - ./monitoring/setup/lib.sh:/lib.sh:ro,Z
          - ./monitoring/setup/roles:/roles:ro,Z
          - monitoring-setup-data:/state:Z
        environment:
          ELASTIC_PASSWORD: ${ELASTIC_PASSWORD:-}
          LOGSTASH_INTERNAL_PASSWORD: ${LOGSTASH_INTERNAL_PASSWORD:-}
          KIBANA_SYSTEM_PASSWORD: ${KIBANA_SYSTEM_PASSWORD:-}
        networks:
          - tpm-network
        depends_on:
          - elasticsearch
    ```

    Ważnym elementem tej definicji jest użycie `init: true`, co oznacza, że usługa ta uruchomi się tylko raz oraz definicja zmiennych środowiskowych w sekcji `environment`, które są wymagane do prawidłowego działania usługi. W tym przypadku, zmienne te są pobierane z pliku `.env` znajdującego się w katalogu głównym projektu: 

    ```sh
    ELASTIC_VERSION=8.6.2

    ELASTIC_PASSWORD='1qaz@WSX'
    LOGSTASH_INTERNAL_PASSWORD='1qaz@WSX'
    KIBANA_SYSTEM_PASSWORD='1qaz@WSX'
    ```

    Właściwa konfiguracja usługi `monitoring-setup` znajduje się w plikach `setup.Dockerfile` oraz `entrypoint.sh` w katalogu `monitoring/setup`. Plik `setup.Dockerfile` definiuje obraz kontenera dla usługi `monitoring-setup`:

    ```Dockerfile
    ARG ELASTIC_VERSION

    # https://www.docker.elastic.co/
    FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION}

    USER root

    RUN set -eux; \
      mkdir /state; \
      chmod 0775 /state; \
      chown elasticsearch:root /state

    USER elasticsearch:root

    ENTRYPOINT ["/entrypoint.sh"]
    ```

    Z kolei plik `entrypoint.sh` zawiera instrukcje, które zostaną wykonane podczas uruchamiania kontenera.

2. **Konfiguracja usług `elasticsearch`, `logstash`, `kibana`**

    Usługi `elasticsearch`, `logstash` i `kibana` są konfigurowane w podobny sposób:

    ```yaml
    services:
      elasticsearch:
        container_name: elasticsearch
        build:
          context: ./monitoring/elasticsearch
          dockerfile: ./elasticsearch.Dockerfile
          args:
            ELASTIC_VERSION: ${ELASTIC_VERSION}
        volumes:
          - ./monitoring/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml:ro,Z
          - elasticsearch-data:/usr/share/elasticsearch/data:Z
        expose:
          - "9200"
          - "9300"
        environment:
          node.name: elasticsearch
          ES_JAVA_OPTS: -Xms512m -Xmx512m
          ELASTIC_PASSWORD: ${ELASTIC_PASSWORD:-}
          discovery.type: single-node
        networks:
          - tpm-network
        restart: unless-stopped

      logstash:
        container_name: logstash
        build:
          context: ./monitoring/logstash
          dockerfile: ./logstash.Dockerfile
          args:
            ELASTIC_VERSION: ${ELASTIC_VERSION}
        volumes:
          - ./monitoring/logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml:ro,Z
          - ./monitoring/logstash/pipeline:/usr/share/logstash/pipeline:ro,Z
        ports:
          - "5000:5000"
          - "5044:5044"
          - "9600:9600"
        environment:
          LS_JAVA_OPTS: -Xms256m -Xmx256m
          LOGSTASH_INTERNAL_PASSWORD: ${LOGSTASH_INTERNAL_PASSWORD:-}
        networks:
          - tpm-network
        depends_on:
          - elasticsearch
        restart: unless-stopped

      kibana:
        container_name: kibana
        build:
          context: ./monitoring/kibana
          dockerfile: ./kibana.Dockerfile
          args:
            ELASTIC_VERSION: ${ELASTIC_VERSION}
        volumes:
          - ./monitoring/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml:ro,Z
        ports:
          - "5601:5601"
        environment:
          KIBANA_SYSTEM_PASSWORD: ${KIBANA_SYSTEM_PASSWORD:-}
        networks:
          - tpm-network
        depends_on:
          - elasticsearch
        restart: unless-stopped
    ```

    Warto zauważyć, że usługa `logstash` zależy od usługi `elasticsearch`, ponieważ wysyła do niej logi. Ponadto, wszystkie usługi korzystają z woluminów, które zapewniają trwałość danych.

    Pliki `elasticsearch.Dockerfile`, `logstash.Dockerfile` i `kibana.Dockerfile` są bardzo podobne do siebie, różnią się jedynie odwołaniami do odpowiednich plików konfiguracyjnych. Wszystkie te pliki znajdują się w katalogach `monitoring/elasticsearch`, `monitoring/logstash` i `monitoring/kibana` odpowiednio. Przykładowo, plik `elasticsearch.Dockerfile`:

    ```Dockerfile
    ARG ELASTIC_VERSION

    FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION}

    # Add elasticsearch plugins setup here
    # RUN elasticsearch-plugin install analysis-icu
    ```

    Każda z usług ma zdefiniowany dodatkowy plik konfiguracyjny, który jest montowany do kontenera. Przykładowo, plik `config/logstash.yml` dla usługi `logstash`:

    ```yaml
    http.host: 0.0.0.0

    node.name: logstash
    ```

    Oraz w przypadku usługi `logstash`, plik `pipeline/logstash.conf`:

    ```conf
    input {
      beats {
        port => 5044
      }

      udp {
            port => 5000
            codec => json
        }

      tcp {
        port => 5000
        codec => json_lines
      }
    }

    output {
      elasticsearch {
        hosts => "elasticsearch:9200"
        user => "logstash_internal"
        password => "${LOGSTASH_INTERNAL_PASSWORD}"
      }
    }
    ```

Wykorzystanie Dockera w procesie konfiguracji stosu ELK przynosi wiele korzyści:

1. **Przejrzystość**: Docker pozwala na izolację usług w kontenerach, co gwarantuje, że konfiguracja jest jednolita niezależnie od środowiska, na którym działa. Dzięki jasnym definicjom w Dockerfile oraz plikom konfiguracyjnym, każda usługa jest dokładnie zdefiniowana, co eliminuje problem "u mnie działa".

2. **Skalowalność**: Docker daje możliwość łatwego skalowania usług w miarę wzrostu potrzeb. Można dodawać więcej instancji Elasticsearch czy Logstash bez konieczności ręcznej konfiguracji każdej z nich.

3. **Zarządzanie**: Dzięki Docker Compose wszystkie usługi są zdefiniowane w jednym pliku, co ułatwia zarządzanie, uruchamianie, zatrzymywanie i aktualizację całego stosu jednym poleceniem.

4. **Integracja**: Docker umożliwia łatwą integrację różnych usług, dzięki czemu usługi ELK mogą być łatwo połączone z innymi aplikacjami czy bazami danych w środowisku deweloperskim.

5. **Bezpieczeństwo**: Izolacja kontenerów zapewnia dodatkową warstwę bezpieczeństwa, chroniąc aplikacje przed potencjalnie szkodliwymi interakcjami. Ponadto Docker umożliwia montowanie konfiguracji jako woluminów tylko do odczytu, co dodatkowo zwiększa bezpieczeństwo.

Konfiguracja stosu ELK kończy proces konfiguracji środowiska deweloperskiego. Stos ELK, w połączeniu z innymi usługami, tworzy spójne i wysoce funkcjonalne środowisko, które jest nie tylko łatwe w zarządzaniu, ale również elastyczne i skalowalne. Wykorzystanie Docker Compose do definiowania wszystkich usług w jednym miejscu sprawia, że całe środowisko staje się bardziej zorganizowane i łatwe w utrzymaniu.

### Interfejs użytkownika

#### Tworzenie projektu za pomocą Vite

Vite, narzędzie zbudowane z myślą o współczesnym front-endzie, jest narzędziem, które zrewolucjonizowało podejście do budowania oraz serwowania plików w trakcie deweloperki. Stworzone przez Evana You, twórcę Vue.js, Vite oferuje szybkość i wydajność poprzez wykorzystanie natywnego modułu ES (ECMAScript Module) oraz innych nowoczesnych technologii. Sama nazwa "Vite" (wymawiana jako /vit/) pochodzi z języka francuskiego i oznacza "szybko" - co odzwierciedla główny cel tego narzędzia, czyli zapewnienie szybkiego rozwoju i feedbacku dla deweloperów.

Korzystając z Vite, projekty są nie tylko szybsze w fazie deweloperskiej, ale także łatwiejsze do skalowania i optymalizacji pod kątem różnych wymagań wytwarzania oprogramowania.

Mechanizm działania Vite:

1. **Szybki Cold Start**: 
   - Vite unika konieczności bundlowania całej aplikacji podczas inicjalizacji serwera deweloperskiego, co znacząco przyspiesza start projektu. 
   - Vite odczytuje i interpretuje jedynie te moduły, które są aktualnie używane przez aplikację, zapewniając tym samym błyskawiczne uruchomienia, nawet w bardzo dużych projektach.

2. **Instant HMR (Hot Module Replacement)**:
   - Hot Module Replacement jest procesem, który pozwala na zastąpienie modułów w czasie uruchomienia aplikacji bez konieczności jej pełnego przeładowania. 
   - Dzięki wykorzystaniu natywnego ESM, Vite jest w stanie precyzyjnie identyfikować, które moduły były zmienione lub są zależne od zmienionego modułu, co umożliwia bardzo szybkie, niemal natychmiastowe, aktualizacje w trakcie deweloperki.

3. **Optymalizacja Build**:
   - Podczas procesu budowania na produkcję, Vite korzysta z Rollup - jednego z najbardziej efektywnych bundlerów w ekosystemie JavaScript, co zapewnia optymalizację kodu na produkcję.
   - Umożliwia wykorzystanie najnowszych technologii JavaScript, a także optymalizacje takie jak code splitting czy tree-shaking, dzięki czemu dostarczana do użytkownika końcowego aplikacja jest jak najbardziej zoptymalizowana pod względem wydajności i wielkości plików.

Przy użyciu Vite, deweloperzy mogą korzystać ze wszystkich zalet nowoczesnych technologii front-endowych, jednocześnie unikając wielu problemów związanych z konfiguracją i wydajnością, które często pojawiają się przy użyciu tradycyjnych bundlerów i narzędzi budujących. Vite, z jego szybkością i efektywnością, pozwala na bardziej płynny i produktywny proces tworzenia aplikacji webowych.

Proces tworzenia polega na wykonaniu poniższego polecenia:

```sh
npm create vite@latest tpm-ui --template react-ts
```

Polecenie to tworzy nowy projekt Vite o nazwie `tpm-ui` z szablonem `react-ts`, który zawiera wszystkie niezbędne zależności i konfiguracje dla aplikacji React napisanej w TypeScript. Kolejny krok to przejście do katalogu projektu i tworzenie plików `.gitignore`, `.eslintrc.cjs` oraz `postinstall.ts`: 

```sh 
cd tpm-ui
touch .gitignore
touch .eslintrc.cjs
touch postinstall.ts
```

Plik `.gitignore` zawiera listę plików i katalogów, które mają być ignorowane przez system kontroli wersji Git. W przypadku projektu Vite, plik ten powinien zawierać następujące wpisy:

```sh
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

/public/ag-grid/
/public/assets/
/public/tinymce/
```

Z kolei plik `.eslintrc.cjs` zawiera konfigurację ESLint, narzędzia do automatycznego formatowania kodu i wykrywania problematycznych wzorców w kodzie. Plik ten powinien zawierać następujące wpisy:

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

Plik `postinstall.ts` zawiera skrypt, który jest uruchamiany po zakończeniu instalacji zależności projektu. Żeby to zadziało się automatycznie, należy dodać wpis do pliku `package.json` w sekcji `scripts`:

```json
{
  "scripts": {
    "postinstall": "node postinstall.ts"
  }
}
```

Na etapie inicjalizacji projektu, skrypt ten jest pusty, ale w przyszłości może zostać użyty do automatycznego generowania plików konfiguracyjnych, instalowania dodatkowych zależności lub uruchamiania innych skryptów.

Kolejny krok to instalacja zależności projektu za pomocą polecenia `npm install`. Po zakończeniu instalacji, struktura projektu powinna wyglądać następująco:

```
tpm-ui
├── node_modules
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── index.html
├── package-lock.json
├── package.json
├── postinstall.ts
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

Pozostałe pliki konfiguracyjne, takie jak `package.json`, `package-lock.json`, `tsconfig.json`, `tsconfig.node.json` oraz `vite.config.ts` są generowane automatycznie podczas inicjalizacji projektu i zawierają domyślne ustawienia dla projektu Vite:

- **`package.json`**: Plik konfiguracyjny npm, który zawiera listę zależności projektu, skrypty, aliasy i inne ustawienia.
- **`package-lock.json`**: Plik konfiguracyjny npm, który zawiera dokładne wersje zależności projektu, co zapewnia spójność wersji zależności między różnymi środowiskami.
- **`tsconfig.json`**: Plik konfiguracyjny TypeScript, który określa różne opcje kompilatora oraz ścieżki bazowe i aliasy dla modułów.
- **`tsconfig.node.json`**: Opcjonalny plik konfiguracyjny, który może być używany do określenia ustawień kompilatora TypeScript specyficznych dla środowiska Node.js, jeśli takowe są używane w projekcie.
- **`vite.config.ts`**: Plik konfiguracyjny Vite napisany w TypeScript, który pozwala na dostosowanie różnych aspektów Vite, takich jak aliasy ścieżek, proxy dla API, konfigurację dodatków i wiele więcej.

Każdy z tych plików konfiguracyjnych jest ważnym elementem ekosystemu projektu i zapewnia różne funkcjonalności oraz kontrolę nad różnymi aspektami pracy deweloperów oraz zachowania aplikacji w różnych środowiskach i fazach cyklu życia oprogramowania.

Po zakończeniu inicjalizacji projektu, można uruchomić serwer deweloperski za pomocą polecenia `npm run dev`. Po uruchomieniu, serwer deweloperski powinien wyświetlić następujący komunikat:

```sh
  VITE v4.4.9  ready in 505 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Po uruchomieniu serwera deweloperskiego, można przejść do przeglądarki i otworzyć adres `http://localhost:5173/` aby zobaczyć domyślną stronę aplikacji. Zaczynając od tego momentu, można rozpocząć pracę nad aplikacją, modyfikując pliki w katalogu `src` i obserwując zmiany w czasie rzeczywistym w przeglądarce.

#### Zarządzanie zależnościami za pomocą narzędzia npm

Narzędzie NPM (Node Package Manager) jest kluczowym elementem ekosystemu Node.js i służy do zarządzania pakietami (modułami). Obejmuje to zarówno instalację, aktualizację, jak i usuwanie pakietów, które mogą być używane w twoim projekcie. Pakiety te mogą obejmować wszystko, od prostych bibliotek pomocniczych do pełnoprawnych frameworków.

Zarządzanie zależnościami z użyciem npm może być realizowane poprzez różne komendy, które są dostępne w narzędziu:
- `npm install [pakiet]`: Instaluje określony pakiet i dodaje go do pliku `package.json` oraz `package-lock.json`.
- `npm uninstall [pakiet]`: Usuwa pakiet i jednocześnie usuwa wpis z `package.json` i `package-lock.json`.
- `npm update [pakiet]`: Aktualizuje pakiet do najnowszej dostępnej wersji oraz aktualizuje wpis w `package.json`.
- `npm list`: Wyświetla zainstalowane pakiety i ich wersje.

NPM używa semantycznego wersjonowania, które jest zdefiniowane jako `MAJOR.MINOR.PATCH`, przy czym:
- `MAJOR` jest zwiększany dla niekompatybilnych zmian, które wymagają zmiany użytkownika.
- `MINOR` jest zwiększany dla nowości, które są kompatybilne wstecz.
- `PATCH` jest zwiększany dla kompatybilnych napraw błędów.

Dodatkowo, wersje mogą zawierać dodatkowe etykiety, takie jak `alpha`, `beta` lub `rc`, które są używane do oznaczania wersji testowych.

Istnieje też podział na lokalne i globalne zależności:
- Lokalne instalacje są preferowane, ponieważ gwarantują, że wszystkie zależności i ich dokładne wersje są dokumentowane i łatwo reprodukowalne między środowiskami. Pakiety lokalne są instalowane w katalogu projektu i są dostępne tylko dla tego projektu. Żeby zainstalować pakiet jako zależność deweloperską, należy użyć flagi `--save-dev` podczas instalacji. Zależności deweloperskie są używane tylko podczas tworzenia projektu i nie są wymagane do uruchomienia aplikacji.
- Globalne instalacje mogą być użyteczne dla narzędzi deweloperskich (takich jak linters czy test runners), które są używane w wielu projektach. Żeby zainstalować pakiet globalnie, należy użyć flagi `-g` podczas instalacji.

Przykładowe polecenia:

```sh
# Instalacja pakietu luxon w wersji 3.3.0
npm install luxon@3.3.0
```

```sh
# Instalacja pakietu @types/luxon w wersji 3.3.1 jako zależność deweloperska
npm install @types/luxon@3.3.1 --save-dev
```

```sh
# Aktualizacja pakietu luxon do najnowszej wersji
npm update luxon
```

```sh
# Usunięcie pakietu luxon
npm uninstall luxon
```

```sh
# Wyświetlenie listy zainstalowanych pakietów
npm list
```

##### NPM Scripts

W sekcji "scripts" pliku `package.json`, możemy definiować skrypty, które mogą być uruchamiane przy użyciu `npm run [skrypt]`. Skrypty te są używane do automatyzacji różnych zadań, takich jak budowanie projektu, uruchamianie testów, czy deployment.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "postinstall": "node ./postinstall.ts"
  }
}
```

Zarządzanie zależnościami to kluczowy aspekt w większości projektów programistycznych, zapewniając, że nasz projekt działa tak samo w różnych środowiskach. NPM jest jednym z najpopularniejszych menedżerów pakietów i jest szeroko stosowane w ekosystemie JavaScript.

#### Wyznaczenie kluczowych elementów interfejsu

Interfejs użytkownika (UI) to kluczowy element każdej strony internetowej lub aplikacji, umożliwiając użytkownikom interakcję z funkcjonalnościami i treściami. Zaprojektowanie intuicyjnego i przyjaznego interfejsu jest fundamentem doświadczenia użytkownika (UX).

System organizacji pracy dla biura tłumaczeń będzie w swojej istocie panelem administracyjnym, który będzie używany przez pracowników biura tłumaczeń do zarządzania projektami i klientami. W związku z tym, interfejs użytkownika powinien używać już istniejących wzorców i konwencji, które są znane użytkownikom i nie wymagają dodatkowego wysiłku w celu zrozumienia. Stąd zostały zdefiniowane kilka kluczowych elementów interfejsu, które są powszechnie stosowane w aplikacjach webowych:

1. **Nawigacja górna (breadcrumbs)**
   - **Definicja**: "Breadcrumbs" są elementem nawigacji, który pomaga użytkownikom zrozumieć, gdzie aktualnie się znajdują w strukturze witryny.
   - **Znaczenie**: Umożliwiają użytkownikom łatwe przejście do wcześniejszych sekcji strony lub powrót do strony głównej.
   - **Dobre praktyki**: Zazwyczaj umieszczane są na górze strony i prezentują ścieżkę nawigacji w formie hierarchicznej.
2. **Nawigacja boczna**
   - **Definicja**: To pionowy pasek narzędzi umieszczony zwykle po lewej stronie interfejsu, zawierający linki do różnych sekcji serwisu.
   - **Znaczenie**: Ułatwia dostęp do różnych sekcji serwisu, umożliwiając szybki dostęp do kluczowych funkcji.
   - **Dobre praktyki**: Powinna być prosta, czytelna, i zawierać ikony lub etykiety ilustrujące każdą sekcję.
3. **Przyciski akcji na pasku nawigacji górnej**
   - **Definicja**: Są to interaktywne elementy, które umożliwiają użytkownikowi dostęp do różnych funkcji, takich jak zmiana języka czy zarządzanie kontem.
   - **Znaczenie**: Wprowadzają dynamiczne funkcje strony, zwiększające dostosowanie do preferencji użytkownika.
   - **Dobre praktyki**: Przyciski powinny być łatwo rozpoznawalne i mieć jasne etykiety lub ikony.
4. **Główna treść strony**
   - **Definicja**: Jest to centralna część interfejsu, gdzie prezentowane są główne informacje, produkty lub funkcje.
   - **Znaczenie**: Zwraca uwagę użytkownika i stanowi główne miejsce, gdzie będą oni spędzać najwięcej czasu.
   - **Dobre praktyki**: Treść powinna być dobrze zorganizowana, czytelna i dostarczać wartościowe informacje.
5. **Footer**
   - **Definicja**: Dolna sekcja strony, która często zawiera linki do stron pomocniczych, informacje kontaktowe oraz prawne.
   - **Znaczenie**: Pomaga użytkownikom znaleźć dodatkowe informacje oraz dostarcza niezbędnych danych np. w zakresie praw autorskich.
   - **Dobre praktyki**: Powinien być przejrzysty, mieć czytelną czcionkę i zawierać istotne linki.

Poniżej przedstawiono przykładowy szkic interfejsu użytkownika, który zawiera kluczowe elementy interfejsu wymienione powyżej. Każdy z elementów jest oznaczony numerem, który odpowiada numerowi w powyższym opisie:

![Layout](./docs/layout.png)

Kontynuując temat konwencji i wzorców, należy też pamiętać o takich ważnych elementach jak kolorystyka, dostępność, responsywność i wiele innych. Rozwiązania te są szeroko opisane w literaturze i nie będą tutaj szczegółowo omawiane, ale należy pamiętać, że są one niezbędne do stworzenia intuicyjnego i przyjaznego interfejsu użytkownika. W projekcie zostanie wykorzystany system projektowania Material Design, który adresuje wiele z tych problemów i zapewnia spójny wygląd i zachowanie aplikacji.

#### Uwierzytelnianie i kontrola dostępu

Uwierzytelnianie i kontrola dostępu to kluczowe elementy każdej aplikacji, które zapewniają bezpieczeństwo i poufność danych. W przypadku interfejsu użytkownika systemu organizacji pracy dla biura tłumaczeń, uwierzytelnianie i kontrola dostępu realizują następujące funkcje:

1. **Blokada dostępu do aplikacji**
   - **Definicja**: Jest to mechanizm, który uniemożliwia dostęp do aplikacji osobom nieupoważnionym.
   - **Znaczenie**: Zapewnia bezpieczeństwo i poufność danych, uniemożliwiając dostęp osobom niepowołanym.
   - **Dobre praktyki**: Powinien być łatwy w użyciu, a jednocześnie zapewniać wysoki poziom bezpieczeństwa.
2. **Uwierzytelnianie użytkownika**
   - **Definicja**: Jest to proces weryfikacji tożsamości użytkownika, który pozwala na potwierdzenie, że użytkownik jest tym, za kogo się podaje.
   - **Znaczenie**: Zapewnia bezpieczeństwo i poufność danych, uniemożliwiając dostęp osobom niepowołanym.
   - **Dobre praktyki**: Powinien być łatwy w użyciu, a jednocześnie zapewniać wysoki poziom bezpieczeństwa.
3. **Kontrola dostępu**
   - **Definicja**: Jest to mechanizm, który pozwala na kontrolę dostępu do różnych funkcji aplikacji na podstawie uprawnień użytkownika.
   - **Znaczenie**: Zapewnia bezpieczeństwo i poufność danych, uniemożliwiając dostęp osobom niepowołanym.
   - **Dobre praktyki**: Powinien być łatwy w użyciu, a jednocześnie zapewniać wysoki poziom bezpieczeństwa.

Cały system uwierzytelniania i kontroli dostępu będzie oparty o Keycloak, otwartoźródłowe narzędzie do zarządzania tożsamością i dostępem. Keycloak został skonfigurowany pod obsługę protokołu OpenID Connect, który jest standardem branżowym dla uwierzytelniania i kontroli dostępu. W przypadku interfejsu użytkownika, zadaniem jest integracja z Keycloak.

Integracja z Keycloak na skonfigurowaniu klienta OIDC w Keycloak oraz tworzeniu kontekstu autoryzacji w aplikacji.

Konfiguracją klienta OIDC w Keycloak polega na utworzeniu klienta w odpowiednim realmie, który będzie używany przez aplikację do uwierzytelniania użytkowników. W tym celu należy przejść do zakładki "Clients" w panelu administracyjnym Keycloak i kliknąć przycisk "Create". Typ klienta powinien być ustawiony na "OpenID Connect", a nazwę klienta można ustawić na dowolną, np. "tpm-ui":

![Keycloak Client](./docs/keycloak-client-ui.png)

Klikamy przycisk "Next". Następnym krokiem będzie konfiguracja klienta. W tym kroku musimy upewnić się, że opcja Client Authentication jest wyłącona, a opcje "Standard Flow Enabled" oraz "Direct Access Grants" są zaznaczone:

![Keycloak Client Config](./docs/keycloak-client-ui-config.png)

Klikamy prycisk "Next". W kolejnym kroku musimy ustawić adres URL aplikacji w polu "Valid Redirect URIs" oraz "Web Origins":

![Keycloak Client URLs](./docs/keycloak-client-ui-urls.png)

Klikamy przycisk "Save". Na tym etapie konfiguracja klienta OIDC w Keycloak jest zakończona.

Kolejnym krokiem jest utworzenie kontekstu autoryzacji w aplikacji. Kontekst autoryzacji jest odpowiedzialny za komunikację z Keycloak i uwierzytelnianie użytkowników. Kontekst autoryzacji został zaimplementowany z użyciem React Context API oraz biblioteki `keycloak-js`.

Na początku, tworzymy plik `AuthContext.tsx` w katalogu `src/contexts`. Zaczynamy od tworzenia instancji klienta Keycloak:

```tsx
const keycloakConfig: KeycloakConfig = {
  realm: "tpm",
  clientId: "tpm-frontend",
  url: environment.authServerUrl,
};

const keycloak = new Keycloak(keycloakConfig);
```

W konfiguracji klienta Keycloak, należy ustawić `realm` na nazwę realmu, który został utworzony w Keycloak, `clientId` na nazwę klienta, który został utworzony w Keycloak, oraz `url` na adres URL instancji Keycloak. W przypadku projektu, wartości te są pobierane z pliku konfiguracyjnego `environment.ts`.

Kolejny krok to utworzenie kontekstu autoryzacji. Kontekst w aplikacji React służy do przechowania globalnego stanu aplikacji i udostępnienia go wszystkim komponentom które są w nim zawarte. W tym przypadku, kontekst autoryzacji będzie zawierał informacje o zalogowanym użytkowniku, takie jak identyfikator, imię, nazwisko, adres email, role, itp. Kontekst autoryzacji będzie też zawierał funkcje, które będą używane do logowania i wylogowywania użytkownika, sprawdzania uprawnień, itp.

Początek implementacji odznacza definicja interfejsu `AuthContextValues`, który będzie zawierał wszystkie wartości, które będą dostępne w kontekście autoryzacji:

```tsx
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
```

Następnie, definiujemy sam kontekst autoryzacji z domyślnymi wartościami używając funkcji `createContext`:

```tsx
export const AuthContext = createContext<AuthContextValues>({
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
});
```

Wartości te są domyślne i będą używane w przypadku, gdy użytkownik nie jest zalogowany. Następnie, definiujemy komponent `AuthContextProvider`. `AuthContextProvider` ma za zadanie inicjalizację klienta Keycloak, uwierzytelnianie użytkownika, oraz przechowywanie informacji o użytkowniku w kontekście autoryzacji. Implementacja używa hooków Reacta. Hooki w React są funkcjami, które pozwalają na manipulację stanem komponentu oraz wykonanie pewnych akcji w odpowiednich momentach cyklu życia komponentu. W tym przypadku, hooki są używane do przechowywania stanu uwierzytelnienia użytkownika oraz informacji o użytkowniku (hook `useState`), a także do inicjalizacji klienta Keycloak i aktualizacji informacji o użytkowniku (hook `useEffect`):

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
    const initializeUser = (authenticated) => {
      setAuthenticated(authenticated);
      const { sub, preferred_username, given_name, family_name, email, realm_access } = keycloak.tokenParsed || {};
      setUserId(sub || "");
      setUsername(preferred_username);
      setFirstName(given_name);
      setLastName(family_name);
      setEmail(email);
      setRoles(realm_access?.roles as Array<Role> || []);
    };

    const setAuthorizationHeader = (config) => {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${keycloak.token}`;
      return config;
    };

    const handleResponseError = async (error) => {
      if (error.response?.status === 401) {
        try {
          const result = await keycloak.updateToken(5);
          if (result) {
            return axios({ ...error.config });
          } else {
            throw new Error("Unauthorized");
          }
        } catch (error) {
          keycloak.logout();
          throw error;
        }
      }
      throw error;
    };

    const initializeKeycloak = async () => {
      try {
        const authenticated = await keycloak.init(keycloakInitOptions);
        if (!authenticated) keycloak.login();
        initializeUser(authenticated);

        axios.interceptors.request.use(setAuthorizationHeader, error => Promise.reject(error));
        axios.interceptors.response.use(response => response, handleResponseError);

        setInitialized(true);
      } catch (error) {
        setAuthenticated(false);
        setInitialized(true);
      }
    };

    initializeKeycloak();
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

Na koniec, dodatkowo definiujemy hook `useAuth`, który pozwala na dostęp do kontekstu autoryzacji w komponentach:

```tsx
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
}
```

Po zdefiniowaniu kontekstu autoryzacji, należy go użyć w aplikacji. W tym celu, należy dodać komponent `AuthContextProvider` blisko korzenia aplikacji tak, aby zawierał wszystkie komponenty, które będą używały kontekstu autoryzacji:

```tsx
const Root = () => {
  const { theme } = useThemeContext();
  const currentTheme = useMemo(() => theme === "dark" ? darkTheme : lightTheme, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthContextProvider>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <BreadcrumbsContextProvider>
              <SnackbarContextProvider>
                <StrictMode>
                  <App />
                </StrictMode>
              </SnackbarContextProvider>
            </BreadcrumbsContextProvider>
          </LocalizationProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
```

Po dodaniu komponentu `AuthContextProvider`, aplikacja jest gotowa do uwierzytelniania użytkowników.

#### Lokalizacja

W erze globalizacji, zdolność aplikacji do obsługi różnych języków i dostosowywania się do kulturowych specyfików danego regionu stała się kluczem do jej sukcesu na międzynarodowym rynku. Lokalizacja odnosi się nie tylko do tłumaczenia treści, ale również do dostosowywania formatu daty, waluty, jednostek miary i innych kulturowych norm. W przypadku systemu zarządzania biurem tłumaczeń, zdolność do obsługi wielu języków jest nie tylko pożądana, ale wręcz konieczna.

W ramach projektu, lokalizacja została zaimplementowana z użyciem biblioteki react-i18next, która jest szeroko stosowana w ekosystemie React. React-i18next jest biblioteką, która umożliwia tłumaczenie treści, obsługuje wiele języków i dostosowuje się do regionalnych ustawień użytkownika. W przypadku aplikacji React, react-i18next jest najczęściej używaną biblioteką do lokalizacji. Kluczowe Funkcje react-i18next:
- **Wsparcie dla wielu języków:** Umożliwia dodawanie i zarządzanie tłumaczeniami dla wielu języków.
- **Lazy Loading:** Tłumaczenia dla określonego języka mogą być ładowane na żądanie, co przyspiesza wczytywanie aplikacji.
- **Detekcja języka:** Automatyczne rozpoznawanie preferowanego języka użytkownika na podstawie ustawień przeglądarki.
- **Zintegrowane interpolacje:** Możliwość wstawiania dynamicznych wartości do tłumaczonych ciągów.

Proces implementacji lokalizacji zaczyna się od inicjalizacji react-i18next. Inicjalizacja react-i18next polega na utworzeniu instancji `i18n` i przekazaniu jej konfiguracji. Konfiguracja `i18n` zawiera informacje o językach, które są obsługiwane przez aplikację, domyślny język, oraz ścieżkę do plików z tłumaczeniami. W tym celu tworzymy plik `localization.ts` w katalogu `src`:

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../public/locales/en/translation.json';
import pl from '../public/locales/pl/translation.json';
// Pozostałe języki

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: {
      translation: en
    },
    pl: {
      translation: pl
    },
    // Pozostałe języki
  },
  fallbackLng: 'en'
});

export default i18n;
```

Kolejny krok to zdefiniowanie tłumaczeń. Tłumaczenia są przechowywane w plikach JSON, gdzie każdy język posiada osobny plik z odpowiadającymi mu tłumaczeniami. W tym celu tworzymy katalog `locales` w katalogu `public`, a następnie tworzymy katalogi dla każdego języka, który jest obsługiwany przez aplikację. W każdym katalogu tworzymy plik `translation.json`, który zawiera tłumaczenia dla danego języka. Przykładowe tłumaczenia dla języka angielskiego:

```json
{
  "layout": {
    "header": {
      "title": "Project Hermes"
    },
    "navigationDrawer": {
      "title": "Project Hermes",
      "items": {
        "projects": "Projects",
        "tasks": "Tasks",
        "expenses": "Expenses",
        "threads": "Threads",
        "clients": "Clients",
        "clientTypes": "Client Types",
        "dictionaries": "Dictionaries",
        "languages": "Languages",
        "countries": "Countries",
        "currencies": "Currencies",
        "accuracies": "Accuracies",
        "expenseCategories": "Expense Categories",
        "industries": "Industries",
        "priorities": "Priorities",
        "translationUnits": "Translation Units",
        "serviceTypes": "Service Types",
        "users": "Users"
      }
    },
    "themeSwitcher": {
      "tooltip": "Toggle light/dark theme"
    },
    "languageSwitcher": {
      "tooltip": "Change language"
    },
    "settingsMenu": {
      "tooltip": "Settings",
      "items": {
        "account": "Account",
        "logout": "Logout"
      }
    }
  },
  // Pozostałe tłumaczenia
}
```

Po zdefiniowaniu tłumczeń, pozostaje użyć ich w aplikacji. W tym celu, należy użyć hooka `useTranslation`, który pozwala na dostęp do tłumaczeń w komponentach. Hook `useTranslation` zwraca obiekt, który zawiera funkcję `t`, która pozwala na tłumaczenie ciągów tekstowych. Przykład użycia hooka `useTranslation`:

```tsx
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();
  const { t } = useTranslation("translation", { keyPrefix: "layout.themeSwitcher" });
  const [darkTheme, setDarkTheme] = useState<boolean>(theme === "dark"); 

  const handleThemeChange = () => {
    setDarkTheme(prevDarkTheme => {
      setTheme(prevDarkTheme ? "light" : "dark");
      return !prevDarkTheme;
    });
  };

  return (
    <Tooltip title={t('tooltip')}>
      <IconButton onClick={handleThemeChange}>
        {darkTheme ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};
```

Ostatnim krokiem jest implementacja mechanizmu zmiany języka. W tym celu, należy użyć hooka `useTranslation`. Hook `useTranslation` zwraca obiekt, który zawiera funkcję `i18n`, która pozwala na zmianę języka. Przykład implementacji mechanizmu zmiany języka w postaci menu:

```tsx
export const LanguageSwitcher = () => {
  const styles = {
    langaugeSwitchContainer: css`
      position: relative;
      display: inline-block;
    `,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState("en");

  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "pl",
      name: "Polski",
    },
    // Pozostałe języki
  ];

  const { t, i18n } = useTranslation("translation", { keyPrefix: "layout.languageSwitcher" });

  const handleOpenLanguageMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setLanguage(language);
    setAnchorEl(null);
  };

  return (
    <div className={styles.langaugeSwitchContainer}>
      <Tooltip title={t("tooltip")}>
        <IconButton onClick={handleOpenLanguageMenu}>
          <Language />
        </IconButton>
      </Tooltip>
      <Menu id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseLanguageMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} onClick={() => handleLanguageChange(language.code)}>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
```

Integracja react-i18next z aplikacją zapewnia elastyczne i skalowalne rozwiązanie do obsługi wielojęzyczności. Biuro tłumaczeń, działając na arenie międzynarodowej, zyskuje dzięki temu narzędziu zdolność do komunikacji z klientami i tłumaczami w ich ojczystym języku, co znacząco poprawia doświadczenie użytkownika i profesjonalizm serwisu.

#### Nawigacja i routing

W aplikcajach webowych, routing jest mechanizmem, który pozwala na nawigację pomiędzy różnymi widokami aplikacji. Z kolei nawigacja to proces przechodzenia pomiędzy różnymi widokami aplikacji. Są one ze sobą ścisłe powiązane, ponieważ nawigacja jest realizowana za pomocą routingu i odwrotnie, routing jest używany do nawigacji.

W przypadku interfejsu użytkownika systemu organizacji pracy dla biura tłumaczeń, routing i nawigacja zostały zaimplementowane z użyciem biblioteki React Router DOM, która cieszy się dużą popularnością w ekosystemie React. React Router DOM jest biblioteką, która pozwala na deklaratywne definiowanie routingu w aplikacji React. Deklaratywne definiowanie oznacza, że routing jest definiowany za pomocą komponentów React, które są renderowane w zależności od ścieżki URL. React Router DOM pozwala też na nawigację pomiędzy widokami aplikacji za pomocą komponentu `Link`, który renderuje link do określonej ścieżki URL.

Implementację routingu zaczynamy od zdefiniowania komponentu `RouterConfig`. Komponent ten zawiera wszystkie ścieżki URL, które są dostępne w aplikacji oraz komponenty, które są renderowane dla tych ścieżek, oraz odpowiada za kontrolę dostępu do poszczególnych ścieżek. Implementację komponentu zapoczątkowuje zdefiniowanie interfejsu `RouteConfig`, który zawiera informacje o ścieżce URL, komponencie, który ma być renderowany dla tej ścieżki, oraz rolach, które są wymagane do uzyskania dostępu do tej ścieżki:

```tsx
type RouteConfig = {
  path: string;
  roles: Role[];
  element: JSX.Element;
};
```

Następnie, definiujemy tablicę `routerConfig`, która zawiera wszystkie ścieżki URL, które są dostępne w aplikacji. Każda ścieżka jest reprezentowana przez obiekt typu `RouteConfig`:

```tsx
const routerConfig: RouteConfig[] = [
  {
    path: "/",
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer",
      "user",
    ],
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer",
      "user",
    ],
    element: <Dashboard />,
  },
  {
    path: "/projects",
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer",
    ],
    element: <Projects.Index />,
  },
  {
    path: "/projects/create",
    roles: ["admin", "project-manager"],
    element: <Projects.Create />,
  },
  {
    path: "/projects/:id/edit",
    roles: ["admin", "project-manager"],
    element: <Projects.Edit />,
  },
  {
    path: "/projects/:id",
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer",
    ],
    element: <Projects.Details />,
  },
  {
    path: "/tasks",
    roles: [
      "admin",
      "project-manager",
      "translator",
      "editor",
      "proofreader",
      "subject-matter-expert",
      "publisher",
      "observer",
    ],
    element: <Tasks.Index />,
  },
  // Pozostałe ścieżki...
];
```

Następnie, definiujemy komponent `RouterConfig`, który będzie renderował komponent `Routes` z React Router DOM. Komponent `Routes` renderuje komponent `Route` dla każdej ścieżki URL zdefiniowanej w tablicy `routerConfig`. Komponent `Route` z kolei renderuje komponent `SecuredRoute`, który jest odpowiedzialny za kontrolę dostępu do ścieżki URL.

```tsx
export const RouterConfig = () => {
  return (
    <Routes>
      {
        routerConfig.map((item, index) => {
          return (
            <Route
              key={`route-${index}`}
              path={item.path}
              element={
                <SecuredRoute roles={item.roles}>
                  <React.Suspense fallback={<LoadingScreen />}>
                    {item.element}
                  </React.Suspense>  
                </SecuredRoute>
              }
            />
          );
        })
      }
      <Route path="/forbidden" element={<Errors.Forbidden />} />
      <Route path="/internal-server-error" element={<Errors.InternalServerError />} />
      <Route path="*" element={<Errors.NotFound />} />
    </Routes>
  );
}
```

Komponent `SecuredRoute` jest odpowiedzialny za kontrolę dostępu do ścieżki URL. Komponent ten sprawdza, czy użytkownik jest zalogowany, a następnie sprawdza, czy użytkownik ma wymagane role do uzyskania dostępu do ścieżki URL. Jeżeli użytkownik nie jest zalogowany, to zostaje przekierowany do strony logowania zgodnie z implementacją kontekstu autoryzacji. Jeżeli użytkownik jest zalogowany, ale nie ma wymaganych ról, to zostaje przekierowany do strony "403 Forbidden". Implementacja komponentu `SecuredRoute` wygląda następująco:

```tsx
export interface SecuredRouteProps {
  roles?: Role[];
  children: ReactNode;
}

export const SecuredRoute = (props: SecuredRouteProps) => {
  const { roles, children } = props;
  const { isAuthenticated, hasAnyRole } = useAuth();

  return isAuthenticated
    ? roles && hasAnyRole(roles) ? <>{children}</> : <Navigate to="/forbidden" />
    : <LoadingScreen />;
};
```

Za nawigacje pomiędzy widokami aplikacji odpowiadają komponenty `NavigationDrawer` oraz `NavigationBreadcrumbs`. Komponent `NavigationDrawer` jest odpowiedzialny za nawigację pomiędzy widokami aplikacji za pomocą nawigacji bocznej. Komponent ten renderuje listę linków do poszczególnych widoków aplikacji. Implementacja komponentu `NavigationDrawer` zaczyna się od zdefiniowania konfiguracji nawigacji, która zawiera informacje o ścieżce URL, ikonie, etykiecie oraz rolach, które są wymagane do uzyskania dostępu do widoku:

```tsx
export function useMenuConfig(): MenuConfig {
  const { t } = useTranslation("translation", { keyPrefix: "layout.navigationDrawer" });

  return [
    {
      icon: ChecklistIcon,
      label: () => t("items.projects"),
      path: Projects.path,
      roles: [
        "admin",
        "project-manager",
        "translator",
        "editor",
        "proofreader",
        "subject-matter-expert",
        "publisher",
        "observer"
      ],
    },
    {
      icon: TaskIcon,
      label: () => t("items.tasks"),
      path: Tasks.path,
      roles: [
        "admin",
        "project-manager",
        "translator",
        "editor",
        "proofreader",
        "subject-matter-expert",
        "publisher",
        "observer"
      ],
    },
    {
      icon: WorkIcon,
      label: () => t("items.clients"),
      items: [
        {
          icon: WorkIcon,
          label: Clients.title,
          path: Clients.path,
          roles: [
            "admin",
            "project-manager"
          ],
        },
        {
          icon: HomeWorkIcon,
          label: () => t("items.clientTypes"),
          path: ClientTypes.path,
          roles: [
            "admin",
            "project-manager"
          ],
        }
      ]
    },
    // Pozostałe elementy...
  ];
}
```

Z kolei komponent `NavigationDrawer` renderuje listę linków do poszczególnych widoków aplikacji. Komponent ten wykorzystuje komponent `Link` z React Router DOM do nawigacji pomiędzy widokami aplikacji. Implementacja komponentu `NavigationDrawer` wykorzystuje komponenty z biblioteki `@mui/material` do renderowania nawigacji bocznej oraz ikon z biblioteki `@mui/icons-material` do renderowania ikon. Zostały również zaimplementowane dodatkowe subtelne animacje i stylowanie, które sprawiają, że nawigacja boczna jest bardziej przyjazna dla użytkownika. Komponent został zaimplementowany w taki sposób, aby uwzględniał uprawnienia użytkownika do poszczególnych widoków aplikacji korzystając z kontekstu autoryzacji. Implementacja komponentu `NavigationDrawer` wygląda następująco:

```tsx
export interface NavigationDrawerProps {
  open: boolean;
}

export const NavigationDrawer = (props: NavigationDrawerProps) => {
  const [open, setOpen] = useState(props.open);
  useEffect(() => setOpen(props.open), [props.open]);

  const drawerWidth = 280;
  const theme = useTheme();
  const { hasAnyRole } = useAuth();

  const drawerOpenAnimation = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });
  const drawerCloseAnimation = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  const styles = {
    drawerOpened: css`
      transition: ${drawerOpenAnimation};
      & .MuiDrawer-paper {
        transition: ${drawerOpenAnimation};
      }
    `,
    drawerClosed: css`
      transition: ${drawerCloseAnimation};
      & .MuiDrawer-paper {
        transition: ${drawerCloseAnimation};
      }
    `,
  };

  const filterMenu = (menu: MenuConfig) => {
    const filteredItems: MenuConfig = [];

    for (const item of menu) {
      if (isItem(item) && hasAnyRole(item.roles)) {
        filteredItems.push(item);
      } else if (isGroup(item)) {
        const filteredGroup = filterItemGroup(item);
        if (filteredGroup.items.length > 0) {
          filteredItems.push(filteredGroup);
        }
      }
    }

    return filteredItems;
  }

  const filterItemGroup = (group: MenuItemGroup) => {
    const filteredItems: MenuConfig = [];

    for (const item of group.items) {
      if (isItem(item) && hasAnyRole(item.roles)) {
        filteredItems.push(item);
      } else if (isGroup(item)) {
        const filteredGroup = filterItemGroup(item);
        if (filteredGroup.items.length > 0) {
          filteredItems.push(filteredGroup);
        }
      }
    }

    return {
      ...group,
      items: filteredItems,
    };
  }

  return (
    <Drawer
      variant="permanent"
      open={open}
      className={open ? styles.drawerOpened : styles.drawerClosed}
      sx={{
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        overflow: "hidden",
        width: open ? drawerWidth : theme.spacing(9),
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : theme.spacing(9),
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          overflow: "hidden",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
        {open ? (
          <List>
            {filterMenu(menuConfig).map((menuItem, index) =>
              (isItem(menuItem) ? (
                <NavigationDrawerItem
                  key={index}
                  open={open}
                  index={index}
                  icon={menuItem.icon}
                  label={menuItem.label}
                  path={menuItem.path}
                  nestIndex={0}
                />
              ) : (
                isGroup(menuItem) && (
                  <NavigationDrawerItemGroup
                    key={index}
                    drawerOpen={open}
                    index={index}
                    icon={menuItem.icon}
                    label={menuItem.label}
                    items={menuItem.items}
                    nestIndex={0}
                  />
                )
              )
            ))}
          </List>
        ) : flattenMenu(filterMenu(menuConfig)).map((menuItem, index) => (
            <NavigationDrawerItem
              key={index}
              open={open}
              index={index}
              icon={menuItem.icon}
              label={menuItem.label}
              path={menuItem.path}
              nestIndex={0}
            />
        ))}
      </Box>
    </Drawer>
  );
};
```

Komponent `NavigationBreadcrumbs` jest odpowiedzialny za nawigację pomiędzy widokami aplikacji za pomocą nawigacji górnej. Komponent ten renderuje listę linków do poszczególnych widoków aplikacji, które pokazują ścieżkę nawigacji od widoku głównego do aktualnego widoku. Implementacja komponentu `NavigationBreadcrumbs` wykorzystuje komponent `Link` z React Router DOM do nawigacji pomiędzy widokami aplikacji oraz komponent `Breadcrumbs` z biblioteki `@mui/material` do renderowania nawigacji górnej:

```tsx
export const NavigationBreadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbsContext();
  const { t, i18n } = useTranslation();

  // Force the component to re-render when the language changes
  useEffect(() => {}, [i18n]);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      <Link
        underline="hover"
        color="text.primary"
        component={RouterLink}
        to="/dashboard"
      >
        <Typography variant="h6" component="div">
          {t("layout.header.title")}
        </Typography>
      </Link>
      {breadcrumbs &&
        breadcrumbs.map((item, index) => {
          return (
            <Link
              key={`breadcrumb-${index}`}
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={item.path}
            >
              <Typography variant="h6" component="div" color="inherit">
                {item.label instanceof Function ? <item.label /> : item.label}
              </Typography>
            </Link>
          );
        })}
    </Breadcrumbs>
  );
};
```

Informacje o tym, jakie linki powinny być wyświetlane w nawigacji górnej są przechowywane w kontekście nawigacji `BreadcrumbsContext`, zaimplementowanym w analogiczny do kontekstu autoryzacji sposób. Kontekst nawigacji `BreadcrumbsContext` jest odpowiedzialny za przechowywanie informacji o ścieżce nawigacji oraz aktualizację tych informacji w zależności od aktualnego widoku aplikacji i jest opisany poprzez interfejs `BreadcrumbsContextValues`:

```tsx
interface Breadcrumb<T = object> {
  label: string | JSX.Element | React.ComponentType<T>;
  path: string;
}

interface BreadcrumbsContextValues {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}
```

Pojedyńcze widoki aplikacji są odpowiedzialne za aktualizację kontekstu nawigacji `BreadcrumbsContext` w zależności od aktualnego widoku aplikacji.

#### Komunikacja z serwerem

Tworzenie odpowiedniej komunikacji między klientem a serwerem jest kluczowe dla każdej aplikacji webowej. W celu zapewnienia wydajnej i skalowalnej komunikacji między klientem a serwerem, w aplikacji został zaimplementowany klient HTTP, który jest odpowiedzialny za wysyłanie żądań HTTP do serwera oraz konwersję odpowiedzi na obiekty JavaScript. 

Klient aplikacji został zaprojektowany w postaci prostej obudowy dla biblioteki Axios, która jest szeroko stosowana w ekosystemie React. Axios jest biblioteką, która pozwala na wykonywanie żądań HTTP w przeglądarce oraz w środowisku Node.js. Biblioteka ta oferuje wiele funkcji, które ułatwiają komunikację z serwerem, takich jak automatyczna konwersja odpowiedzi na obiekty JavaScript, obsługa błędów, anulowanie żądań, obsługa zapytań i odpowiedzi, itp.

Pierwszy krok w implementacji klienta aplikacji to obudowanie metod `get`, `post`, `put`, `patch`, `delete` klienta Axios w celu wykorzystania ich w aplikacji. Zaczynamy od utworzenia pliku `ApplicationClient.ts` w katalogu `src/client` i wprowadzamy następującą implementację:

```ts
function toObservable<T>(promise: Promise<AxiosResponse<T>>): Observable<T> {
  return new Observable((observer) => {
    promise
      .then((response) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}

function getResource<TResponse>(
  path: string,
  search?: Partial<Search>,
  config?: {
    responseType?: ResponseType;
    headers?: object;
  }
): Observable<TResponse> {
  const params = search
    ? {
        page: search.page,
        size: search.pageSize,
        sort:
          search.sort &&
          search.sort.map((s) => `${s.field}:${s.direction}`).join("&"),
        search:
          search.filters &&
          search.filters
            .map((f) => `${f.field}:${f.operator}:${f.value || ""}`)
            .join("&"),
      }
    : undefined;

  return toObservable(
    axios.get(`${environment.apiUrl}/${path}`, {
      params: params,
      responseType: config?.responseType,
      headers: config?.headers,
    })
  );
}

function postResource<TRequest, TResponse>(
  path: string,
  body: TRequest
): Observable<TResponse> {
  return toObservable(
    axios.post(`${environment.apiUrl}/${path}`, body)
  );
}

function postMultipartResource<TResponse>(
  path: string,
  body: FormData
): Observable<TResponse> {
  return toObservable(
    axios.post(`${environment.apiUrl}/${path}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
}

function putResource<TRequest, TResponse>(
  path: string,
  body: TRequest
): Observable<TResponse> {
  return toObservable(
    axios.put(`${environment.apiUrl}/${path}`, body)
  );
}

function patchResource<TRequest, TResponse>(
  path: string,
  body?: TRequest
): Observable<TResponse> {
  return toObservable(
    axios.patch(`${environment.apiUrl}/${path}`, body)
  );
}

function deleteResource(path: string) {
  return toObservable(
    axios.delete(`${environment.apiUrl}/${path}`)
  );
}
```

Domyślnie, żądania HTTP wykonane za pomocą Axios zwracają Promise, ale w systemie organizacji pracy dla biura tłumaczeń, zdecydowano się na wykorzystanie Observable z biblioteki RxJS. Ma to na celu wykorzystanie takich zalet RxJS, jak:

1. **Strumienie Danych (Data Streams):** Observables traktują wszelkie dane jako strumienie. W odróżnieniu od promisów, które reprezentują jedno wartość w czasie, Observables mogą emitować wiele wartości w różnych momentach. Pozwala to na efektywną obsługę danych w czasie rzeczywistym, takich jak strumieniowanie wideo, aktualizacje na żywo i inne interaktywne funkcje.
2. **Operatory (Operators):** Operatory RxJS umożliwiają skomplikowane operacje na strumieniach danych. Dzięki nim, możemy filtrować, mapować, redukować i łączyć strumienie w sposób modularny i złożony. Ułatwiają one również obsługę błędów, retryingów i wielu innych operacji, które byłyby trudne do zaimplementowania przy użyciu tradycyjnych callbacków lub promisów.
3. **Leniwa Wykonania (Lazy Execution):**
Observables nie są aktywowane dopóki ktoś na nie nie "subskrybuje". To oznacza, że możemy zdefiniować cały przepływ danych i operacje na nim bez faktycznego przetwarzania danych do momentu, gdy są one rzeczywiście potrzebne. Daje to elastyczność w kontroli nad przepływem danych.
4. **Wielokrotne Wartości i Łatwość Obsługi Błędów:** Innym kluczowym aspektem Observables jest ich zdolność do emitowania wielu wartości w czasie oraz łatwość w obsłudze błędów. W przypadku wystąpienia błędu w strumieniu, możemy łatwo przechwycić go i zareagować, na przykład poprzez retrying, czy też przekazanie błędu do odpowiedniego mechanizmu obsługi.

Następnie, definiujemy klienta aplikacji, który jest odpowiedzialny za wykonywanie żądań HTTP do serwera oraz konwersję odpowiedzi na obiekty JavaScript. Klient aplikacji jest zaprojektowany w taki sposób, aby zaoferować kolejny poziom abstrakcji i zamiast oferować metody obsługujące żądania HTTP, oferuje metody obsługujące konkretne zasoby. Implementacja klienta aplikacji wygląda następująco:

```ts
export const applicationClient = {
  projects() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Project>> => getResource("project", search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource("project/export", search, { responseType: "blob" }),
      create: (body: CreateProject): Observable<Project> => postResource("project", body),
      refdata: () => {
        return {
          statuses: (): Observable<ProjectStatus[]> => getResource(`project/refdata/status`),
          teamMembers: () => {
            return {
              roles: (): Observable<ProjectRole[]> => getResource(`project/refdata/team-member/role`),
            };
          }
        };
      },
      withId: (id: string) => {
        return {
          get: (): Observable<Project> => getResource(`project/${id}`),
          update: (body: UpdateProject): Observable<Project> => putResource(`project/${id}`, body),
          moveStart: (body: ProjectMoveStart): Observable<ProjectStartMoved> => patchResource(`project/${id}/move-start`, body),
          moveDeadline: (body: ProjectMoveDeadline): Observable<ProjectDeadlineMoved> => patchResource(`project/${id}/move-deadline`, body),
          finishDraft: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/finish-draft`),
          backToDraft: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/back-to-draft`),
          startProgress: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/start-progress`),
          startReview: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/start-review`),
          approve: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/approve`),
          reject: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/reject`),
          deliver: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/deliver`),
          invoice: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/invoice`),
          pay: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/pay`),
          putOnHold: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/put-on-hold`),
          resume: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/resume`),
          cancel: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/cancel`),
          reopen: (): Observable<ProjectNewStatus> => patchResource(`project/${id}/reopen`),
          teamMembers: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<TeamMember>> => getResource(`project/${id}/team-member`, search),
              add: (body: CreateTeamMember): Observable<TeamMember> => postResource(`project/${id}/team-member`, body),
              remove: (id: string) => deleteResource(`project/${id}/team-member/${id}`)
            };
          },
          tasks: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Task>> => getResource(`project/${id}/task`, search),
              export: (search?: Partial<Search>): Observable<unknown> => getResource(`project/${id}/task/export`, search, { responseType: "blob" }),
              create: (body: CreateTask): Observable<Task> => postResource(`project/${id}/task`, body),
            };
          },
          expenses: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Expense>> => getResource(`project/${id}/expense`, search),
              export: (search?: Partial<Search>): Observable<unknown> => getResource(`project/${id}/expense/export`, search, { responseType: "blob" }),
              create: (body: CreateExpense): Observable<Expense> => postResource(`project/${id}/expense`, body),
            };
          },
          threads: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<Thread>> => getResource(`project/${id}/thread`, search),
              create: (body: CreateThread): Observable<Thread> => postResource(`project/${id}/thread`, body),
            };
          },
          files: () => {
            return {
              all: (search?: Partial<Search>): Observable<Page<File>> => getResource(`project/${id}/file`, search),
              export: (search?: Partial<Search>): Observable<unknown> => getResource(`project/${id}/file/export`, search, { responseType: "blob" }),
              create: (body: FormData) => postMultipartResource(`project/${id}/file`, body),
            };
          },
        };
      },
    };
  },
  clients() {
    return {
      all: (search?: Partial<Search>): Observable<Page<Client>> => getResource(`client`, search),
      export: (search?: Partial<Search>): Observable<unknown> => getResource(`client/export`, search, { responseType: "blob" }),
      create: (body: CreateClient): Observable<Client> => postResource(`client`, body),
      withId: (id: string) => {
        return {
          get: (): Observable<Client> => getResource(`client/${id}`),
          update: (body: UpdateClient): Observable<Client> => putResource(`client/${id}`, body),
          activate: (): Observable<ClientStatus> => patchResource(`client/${id}/activate`),
          deactivate: (): Observable<ClientStatus> => patchResource(`client/${id}/deactivate`),
        };
      },
    };
  },
  // Pozostałe zasoby...
};
```

Co z kolei pozwala na wykonywanie żądań HTTP do serwera w sposób dużo bardziej czytelny i przejrzysty:

```tsx
const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  applicationClient.projects().all().subscribe((response) => {
    setProjects(response.content);
  });
}, []);
```

W wyniku, otrzymaliśmy klient aplikacji, zapełniający wysoki poziom abstrakcji i zapełnia asynchroniczność. To pozwoli na łatwe wykorzystanie klienta aplikacji w widokach i formularzach wszędzie tam, gdzie jest to potrzebne. Z kolei asynchroniczność pozwoli znacznie poprawić wydajność aplikacji, pozwalając na uniknięcie blokowania interfejsu użytkownika w czasie wykonywania żądań HTTP.

#### Implementacja widoków

* Widoki aplikacji są odpowiedzialne za prezentację danych użytkownikowi.

W kontekście systemu organizacji pracy dla biura tłumaczeń, widokiem nazywany jest komponent, odpowidzialny za prezentacje zasobu aplikacji użytkownikowi oraz umożliwiają użytkownikowi interakcje z prezentowanym zasobem. Widoki w aplikacji są zamieszczone w katalogu `src/pages`, który zawiera podkatalogi dla poszczególnych zasobów aplikacji:

```bash
src/pages
├── clients
├── dashboard
├── dictionaries
│   ├── accuracy
│   ├── client-type
│   ├── country
│   ├── currency
│   ├── expense-category
│   ├── industry
│   ├── language
│   ├── priority
│   ├── service-types
│   └── unit
├── errors
├── expenses
├── projects
├── tasks
├── threads
├── users
└── utils
```

Każdy podkatałog zawiera pliki, odpowiedzialne za pojedyńcze widoki aplikacji. Złożoność takiego widoku jest zależna od złożoności zasobu, który jest prezentowany. W przypadku zasobów, które są proste i mają prostą interakcje, tych plików kilka, jak na przykład w przypadku `country`:

```bash
src/pages/dictionaries/country
├── Countries.ts
├── Details.tsx
└── Index.tsx
```

Tak jak w przypadku zasobów, które są bardziej złożone i mają bardziej złożoną interakcje, tych plików może być znacznie więcej, jak na przykład w przypadku `project`:

```bash
.
├── Create.tsx
├── Details.tsx
├── Edit.tsx
├── Index.tsx
├── Projects.ts
└── details
    ├── ProjectDetails.tsx
    ├── ProjectExpenses.tsx
    ├── ProjectFiles.tsx
    ├── ProjectTasks.tsx
    ├── ProjectTeamMembers.tsx
    ├── ProjectThreads.tsx
    ├── context
    │   └── ProjectContext.tsx
    ├── dialogs
    │   ├── ProjectMoveDeadlinesDialog.tsx
    │   └── ProjectMoveStartDialog.tsx
    └── handlers
        └── ProjectStatusTransitionHandlers.ts
```

Taki podział plików pozwala na łatwiejsze zarządzanie kodem źródłowym aplikacji, a także na łatwiejsze zarządzanie złożonością widoków aplikacji. Każdy widok w aplikacji jest zaimplementowany w postaci komponentu funkcyjnego, który wykorzystuje hooki React. Implementacja każdego widoku zaczyna się od utworzenia podstawowego komponentu funkcyjnego.
Do przykładu, implementacja widoku `src/pages/client/Details.tsx` zaczyna się od:

```tsx
const Details = () => {
  return (
    <h2>Client List</h2>
  );
};

export default Details;
```

Kolejny krok 

* Widoki aplikacji są odpowiedzialne za pobieranie danych z serwera oraz za ich prezentację użytkownikowi.
* React.lazy oraz React.Suspense są wykorzystywane do ładowania widoków aplikacji asynchronicznie.
* Widoki aplikacji są zaimplementowane w taki sposób, aby uwzględniały uprawnienia użytkownika do poszczególnych elementów interfejsu użytkownika korzystając z kontekstu autoryzacji.

#### Implementacja formularzy

#### Wdrożenie aplikacji

### Serwer aplikacji
#### Tworzenie projektu za pomocą Spring Initializr
#### Narzędzie Gradle
#### Warstwa domeny aplikacji
#### Uwierzytelnianie i kontrola dostępu
#### Komunikacja z bazą danych
#### Komunikacja z serwisami zewnętrznymi
#### Implementacja logowania i monitorowania
#### Testowanie
#### Wdrożenie aplikacji

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
