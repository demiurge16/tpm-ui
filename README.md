# System organizacji prace dla biura tłumaczeń

## Spis treści

* [Wprowadzenie](#wprowadzenie)
  * [Wspóczesne zarządzanie projektami](#wspóczesne-zarządzanie-projektami)
  * [Systemy zarządzania projektami](#systemy-zarządzania-projektami)
  * [Biznes tłumaczeń w dzisiejszych czasach](#biznes-tłumaczeń-w-dzisiejszych-czasach)
  * [Czemu SI jeszcze nie zastąpiła człowieka w tłumaczeniach?](#czemu-si-jeszcze-nie-zastąpiła-człowieka-w-tłumaczeniach)
  * [Czemu warto używać specjalistycznego narzędzia](#czemu-warto-używać-specjalistycznego-narzędzia)
  * [Kto jest docelowym odbiorcą](#kto-jest-docelowym-odbiorcą)
  * [Geneza projektu i inspiracje](#geneza-projektu-i-inspiracje)
* [Koncepcja aplikacji](#koncepcja-aplikacji)
  * [Założenia i cele projektu](#założenia-i-cele-projektu)
  * [Funkcjonalności aplikacji](#funkcjonalności-aplikacji)
* [Projekt aplikacji](#projekt-aplikacji)
  * [Przypadki użycia i historyjki użytkownika](#przypadki-użycia-i-historyjki-użytkownika)
    * [Jako użytkownik, chcę:](#jako-użytkownik-chcę)
    * [Jako kierownik projektu, chcę:](#jako-kierownik-projektu-chcę)
    * [Jako tłumacz, chcę:](#jako-tłumacz-chcę)
    * [Jako administrator systemu, chcę:](#jako-administrator-systemu-chcę)
    * [Jako inżynier wsparcia, chcę:](#jako-inżynier-wsparcia-chcę)
  * [Diagram klas](#diagram-klas)
  * [Diagramy stanów](#diagramy-stanów)
  * [Wzorce i zasady projektowe](#wzorce-i-zasady-projektowe)
    * [Filozofia projektu](#filozofia-projektu)
    * [Domain-driven design (DDD)](#domain-driven-design-ddd)
    * [Architektura heksagonalna, czyli wzorzec Porty i adaptery (HA)](#architektura-heksagonalna-czyli-wzorzec-porty-i-adaptery-ha)
    * [Wstrzykiwanie zależności (DI)](#wstrzykiwanie-zależności-di)
    * [Logowanie i monitorowanie](#logowanie-i-monitorowanie)
    * [Kombinacja DDD, HA, DI i logowania/monitorowania](#kombinacja-ddd-ha-di-i-logowaniamonitorowania)
    * [Architektura wielowarstwowa](#architektura-wielowarstwowa)
* [Wybrany stos technologiczny](#wybrany-stos-technologiczny)
  * [Interfejs użytkownika](#interfejs-użytkownika)
    * [React](#react)
    * [React Router DOM](#react-router-dom)
    * [Redux](#redux)
    * [RxJS](#rxjs)
    * [SCSS](#scss)
    * [Material UI (React)](#material-ui-react)
    * [TypeScript](#typescript)
    * [npm](#npm)
  * [Logika biznesowa](#logika-biznesowa)
    * [Kotlin](#kotlin)
    * [Spring Framework](#spring-framework)
    * [Spring Boot](#spring-boot)
    * [Spring Web](#spring-web)
    * [Spring WebFlux](#spring-webflux)
    * [Spring Data](#spring-data)
    * [Spring Security](#spring-security)
    * [Spring Cloud](#spring-cloud)
    * [Gradle](#gradle)
    * [REST](#rest)
  * [API](#api)
    * [RestCountries](#restcountries)
    * [SIL International](#sil-international)
    * [exchangerate.host](#exchangeratehost)
  * [Testy](#testy)
    * [JUnit](#junit)
    * [Mockito](#mockito)
  * [Baza danych](#baza-danych)
    * [PostgreSQL](#postgresql)
    * [Redis](#redis)
  * [Wdrożenie](#wdrożenie)
    * [Docker](#docker)
    * [Kubernetes](#kubernetes)
  * [Magazyn plików](#magazyn-plików)
    * [Minio](#minio)
  * [Monitoring i Logowanie](#monitoring-i-logowanie)
    * [Elasticsearch](#elasticsearch)
    * [Kibana](#kibana)
    * [Logstash](#logstash)
    * [Filebeat](#filebeat)
    * [Metricbeat](#metricbeat)
    * [Heartbeat](#heartbeat)
  * [Narzędzia dodatkowe](#narzędzia-dodatkowe)
    * [Swagger](#swagger)
    * [PgAdmin](#pgadmin)
    * [RedisInsight](#redisinsight)
  * [Uwierzytelnianie](#uwierzytelnianie)
    * [OAuth2](#oauth2)
    * [OpenID Connect](#openid-connect)
    * [JWT](#jwt)
    * [Keycloak](#keycloak)
* [Prezentacja](#prezentacja)
  * [Zarządzanie projektem](#zarządzanie-projektem)
  * [Zapewnienie jakości](#zapewnienie-jakości)
  * [Komunikacja i współpraca](#komunikacja-i-współpraca)
  * [Zarządzanie zasobami](#zarządzanie-zasobami)
  * [Raportowanie i analiza](#raportowanie-i-analiza)
  * [Bezpieczeństwo](#bezpieczeństwo)
  * [Logowanie i monitoring](#logowanie-i-monitoring)
* [Przyszłość i rozwój aplikacji](#przyszłość-i-rozwój-aplikacji)
  * [Integracja z narzędziami maszynowego tłumaczenia](#integracja-z-narzędziami-maszynowego-tłumaczenia)
  * [Integracja z narzędziami do analizy tekstu](#integracja-z-narzędziami-do-analizy-tekstu)
  * [Integracja ze słownikami terminologicznymi](#integracja-ze-słownikami-terminologicznymi)
  * [Glosariusze](#glosariusze)
  * [Rozbudowanie możliwości raportowania](#rozbudowanie-możliwości-raportowania)
* [Podsumowanie](#podsumowanie)

## Wprowadzenie

###	Wspóczesne zarządzanie projektami

Wykonanie każdego zadania, nieważne jak skomplikowane i wielkie - czy ż by to była budowa nowego wieżowca czy otwarcie małego osiedlowego sklepu - może być nazwane projektem. Większość z nas dokładnie wie, jak tego rodzaju dzieła kształtują nasz życiu osobistym i/lub zawodowym. Niestety, nie wszystkie projekty kończą się pełnym sukcesem. Zdarzają się prekroczenia budżetów i terminów realizacji, mogą nie spełniać wymagań stawianych przez klientów lub przez nas samych. Część projektów zostaje porzucona.

Umiejętne zarżądzanie jest ważnym czynnikiem, mającym znaczący wpływ na sukces w realizacji projektu. Skuteczne zarządzanie opiera się na wysokim poziomie kompetencji w kilku obszarach. Potrzebne są umiejętności optymalnego planowania, podtrzymania motywacji zespołu, komunikacji interpersonalnej oraz często szeroka wiedza techniczna i dziedzinowa. Wszystkie te elementy są istotne podczas realizacji różnorodnych typu projektów i maja olbrzymi wpływ na ich końcowy sukces [1]. Zarządzanie projektami dzisiaj zajmuje się zbieraniem wiedzy i poszerzaniem wiedzy oraz budowaniem narzędzi, metodyk i technik, które pomagają w efektywnej realizacji projektów. Zarządzanie projektami jest bardzo bogatą i szeroką dyscypliną zawiera w sobie tysiące lat doświadczenia w realizacji różnej skali projektów i stanowi jedną z najbardziej dynamicznie rozwijających się dziedzin zarządzania. Wiele organizacji, w tym także te związane z tłumaczeniami, zaczyna dostrzegać korzyści płynące z zastosowania narzędzi i technik zarządzania projektami.

Pierwsza połowa XX wieku stała się początkiem ery szerokiego użycia nowych technologii i narzędzi. Upowszechnienie samolotów i samochodów poskutkowało zwiększeniem mobilności zasobów i pozwoliło na dużo bardziej efektywną ich alokację. Rozwój środków telekomunikacji w postaci telegrafów i telefonów spowodował zanczące uproszenia w komunikacji na duże odłegłosći. Pojawiały się pierwsze komputery i bazy danych, co z kolei uprościło różnolakie obliczenia i procesy administracyjne. Kolejnym ważnym w tym okresie wydarzeniem było pojawienie się pierwszych koncepcji zarządzania projektami. W 1917 roku Henry Gantt opracował diagram, który pozwalał na wizualizację harmonogramu projektu. Jednym z pierwszych zastosowań wykresu Gantta w dużych projektach było planowanie i realizacja budowy Zapory Hoovera w latach 1931-1936[2]. 

Za początek współczesnego zarządzania projektami można uznać założenie Amerykańskiego Stowarzyszenia Inżynierów Kosztów (ang. The American Association of Cost Engineers, dzisiaj AACE International) w roku 1956, które do dzisiaj pozostaje wiodącym stowarzyszeniem zawodowym dla kosztorysantów, inżynierów kosztów, planistów, kierowników projektów i specjalistów ds. kontroli projektów. W kolejnych latach zaczęły pojawiać się pierwsze metodyki zarządzania projektami, takie jak CPM/PERT. W roku 1969 powstał Project Management Institute (PMI), który jest największą organizacją na świecie zrzeszającą specjalistów z zakresu zarządzania projektami. W kolejnych latach zaczęły pojawiać się kolejne metodyki zarządzania projektami, takie jak PRINCE2, PMBOK, Scrum, Kanban, Lean, itd.

Na przesztrzeni lat możemy zauważyć jak podejście do zarządzania projektami zmieniało się od bardziej "sztywnego" sekwencyjnego podejścia, które zakładało że wszystkie wymagania projektówe są znane na początku realizacji do "reaktywnego" zwinnego podejścia, które pozwalało lepiej przystosować się do ciągle zmieniających sie potrzeb. Zmiany te wynikały ze wzrostem skali i złożoności projektów oraz potrzebą reagować na coraz bardziej dynamicznie rozwijający się świat.

Najbardziej znaną sekwencyjną metodyką jest Waterfall. W dniu dzisiejszym najczęściej Waterfall jest wykorzystywany w małych projektach, termin realizacji których jest za mały żeby zaszła możliwość zmiany wymagań lub w projektach, które są bardzo dobrze zdefiniowane i nie ulegają zmianie w trakcie realizacji, np. grach wideo czy projektach budowlanych.

W większości innych przypadków są stosowane podejścia zwinne, często określanie jako podejścia Agile. Agile sam w sobie nie jest metodyką, a raczej zbiorem wartości i zasad, które są opisane w Agile Manifesto. Metody, które spełniają wartości Agile, to np. Scrum, Kanban, FDD, RAD, XP, itd. Metodyki Agile pozwalają na szybkie dostosowanie się do potrzeb klięnta czy zmian rynku[2][3][5]. Według tego podejścia, sukces projektu zależy od ciągłej komunikacji między zespołem projektowym a klientem oraz od częstych wersji prototypowych, które pozwalają na szybką reakcję na zmieniające się potrzeby klienta [2]. Chociaż najczęściej podejście Agile stosowane jest w projektach informatycznych, to jednak może być również wykorzystywane w innych projektach, które wymagają częstych zmian i dostosowywania się do zmieniających się potrzeb klienta [6], czy też w projektach, które wymagają częstego testowania i weryfikacji.

Innym ważnym elementem współczesnego zarządzania projektami jest wykorzystanie narzędzi informatycznych, takich jak oprogramowanie do zarządzania projektami, które umożliwiają prowadzenie projektów na wysokim poziomie i ułatwiają koordynację pracy zespołu [1]. Dodatkowo, analiza danych i wykorzystanie narzędzi Business Intelligence pozwala na wgląd w efektywność projektów oraz umożliwia podejmowanie szybkich i trafnych decyzji [1].

Ważnym elementem współczesnego zarządzania projektami jest również zwrócenie uwagi na aspekty związane z etyką i zrównoważonym rozwojem [1][4]. Zgodność z przepisami i normami, a także zasadami etycznymi i społecznymi, to kluczowe elementy dla długoterminowego sukcesu projektu i organizacji [1].

Źródła:

1. Project Management Institute (PMI) - https://www.pmi.org/
2. Agile Alliance - https://www.agilealliance.org/
3. "Agile Project Management with Scrum" - Ken Schwaber
4. "Effective Project Management: Traditional, Agile, Extreme" - Robert K. Wysocki
5. "The Project Manager's Guide to Mastering Agile" - Charles G. Cobb
6. Waterfall vs Agile - https://www.atlassian.com/agile/project-management/waterfall-vs-agile
7. Waterfall Model a Complete Guide - 2019 Edition - Gerardus Blokdyk

### Systemy zarządzania projektami

System zarządzania projektami (Project Management System, PMS) to narzędzie informatyczne, które pozwala na kompleksowe zarządzanie projektem poprzez koordynację pracy zespołu, planowanie zadań, monitorowanie postępów i raportowanie wyników. Często PMS wspierają różne współczesne metody zarządznia projektami, w tym z rodziny Agile. [8][9]

Przykładowe PMS to:

* Asana
* Trello
* Jira (często w połączeniu z Confluence)
* Monday
* Basecamp
* Microsoft Project
* Smartsheet
* Wrike
* Notion
* Redmine

Systemy PMS oferują szereg funkcji, takich jak harmonogramowanie projektu, przydział zadań i zasobów, monitorowanie postępu, śledzenie kosztów, tworzenie raportów, zarządzanie ryzykiem, komunikacja i współpraca między członkami zespołu projektowego, zarządzanie dokumentacją projektową oraz udostępnianie informacji zewnętrznym interesariuszom.

Jedną z głównych zalet systemów PMS jest zwiększenie efektywności zarządzania projektem. Dzięki temu narzędziu można w łatwy sposób zaplanować zadania, przydzielić je do odpowiednich członków zespołu i monitorować postępy ich realizacji. Systemy te umożliwiają również zdefiniowanie celów, weryfikację osiągnięć, ocenę ryzyka oraz identyfikację potencjalnych problemów. [10]

Kolejną korzyścią wynikającą z zastosowania PMS jest zwiększenie transparentności działań w projekcie. Wszyscy członkowie zespołu mają dostęp do aktualnych informacji na temat postępów i wyników projektu, a także mogą w prosty sposób wymieniać się informacjami i uwagami na temat pracy. Systemy PMS pozwalają również na zwiększenie komunikacji z zewnętrznymi interesariuszami, co jest szczególnie ważne w przypadku dużych i złożonych projektów. [11]

Korzyści wynikające z wykorzystania systemów PMS dotyczą również oszczędności czasu i zwiększenia efektywności pracy. Dzięki temu narzędziu można w prosty i szybki sposób reagować na zmieniające się wymagania projektu, a także przeprowadzać analizy i prognozy dotyczące postępów i kosztów. [12]

Systemy PMS wykorzystują również narzędzia analityczne i sztuczną inteligencję w celu poprawy efektywności zarządzania projektem. [8]

Systemy te mogą być wykorzystywane do zarządzania różnymi projektami, takimi jak tworzenie oprogramowania, budowa, kampanie marketingowe i inne. Są one zaprojektowane tak, aby pomóc kierownikom projektów i zespołom pozostać zorganizowanym, efektywnie współpracować i dostarczać projekty na czas i w ramach budżetu. [8]

Źródła:

8. Project Management Institute (PMI) - https://www.pmi.org/
9. "Project Management Systems: A Technology Review" - Alok Mishra and Neeraj Mishra, International Journal of Computer Applications Technology and Research, Volume 5– Issue 1, 2016
10. "The Benefits of Project Management Software" - Derek Huether, ProjectManager.com - https://www.projectmanager.com/blog/the-benefits-of-project-management-software
11. "The Advantages of Project Management Software" - Workzone - https://www.workzone.com/blog/the-advantages-of-project-management-software/
12. "Why Use Project Management Software?" - Zoho - https://www.zoho.com/projects/blog/

### Biznes tłumaczeń w dzisiejszych czasach

W dzisiejszych czasach coraz więcej firm angażuje się w handel międzynarodowy, co z kolei wymaga znajomości języków obcych. Wiele przedsiębiorstw korzysta z usług tłumaczeniowych, aby móc skutecznie komunikować się z klientami zagranicznymi i przekazywać informacje na różnych rynkach.

Tłumaczenia biznesowe to rodzaj tłumaczeń, które dotyczą dokumentów biznesowych, takich jak umowy, dokumenty finansowe, strategie marketingowe, raporty, a także prezentacje i strony internetowe. Wymagają one specjalistycznej wiedzy oraz znajomości terminologii branżowej, a także precyzyjnego tłumaczenia treści, które nie pozostawiają wątpliwości.

Wiele firm decyduje się na współpracę z biurem tłumaczeń, które oferuje usługi tłumaczenia biznesowego. Taka współpraca pozwala na skuteczne i profesjonalne przekładanie dokumentów, co z kolei przyczynia się do budowania pozytywnego wizerunku firmy na rynkach zagranicznych. Profesjonalne biuro tłumaczeń zatrudnia tłumaczy z doświadczeniem w danej branży, co zapewnia wysoką jakość tłumaczeń. [1][2][4]

Jednym z trendów w biznesie tłumaczeń jest wykorzystanie narzędzi tłumaczeniowych opartych na sztucznej inteligencji. Dzięki nim tłumaczenia stają się szybsze i bardziej efektywne, co z kolei przyczynia się do zwiększenia konkurencyjności firmy na rynkach międzynarodowych. [3]

Źródła:

1. "Business Translation Services for Global Enterprises" - TransPerfect - https://www.transperfect.com/services/business-translation-services [dostęp: 21.02.2023]
2. "What is Business Translation?" - SDL - https://www.sdl.com/solutions/translation/what-is-business-translation/ [dostęp: 21.02.2023]
3. "The Role of Translation in Global Business" - Multilingua Blog - https://www.multilingua.com/blog/the-role-of-translation-in-global-business/ [dostęp: 21.02.2023]
4. "Business Translation Services" - LingvoHouse - https://lingvohouse.com/services/business-translation/ [dostęp: 21.02.2023]

### Czemu SI jeszcze nie zastąpiła człowieka w tłumaczeniach?

Sztuczna inteligencja (SI) odgrywa coraz większą rolę w przetwarzaniu języka naturalnego i tłumaczeniu, ale mimo postępującej automatyzacji, wciąż nie zastępuje żywych tłumaczy [1]. Istnieje kilka powodów, dla których SI nie jest jeszcze w stanie zastąpić tłumaczy:

Brak kontekstu: W przetwarzaniu języka naturalnego kontekst jest kluczowy dla zrozumienia tekstu. SI może mieć trudności w zrozumieniu kontekstu, co prowadzi do błędów tłumaczeniowych [2].

Złożoność języka naturalnego: Język naturalny jest bardzo złożony i ma wiele niuansów i subtelnych znaczeń. SI może mieć trudności w przeniesieniu tych niuansów i znaczeń na inny język [2].

Złożoność tłumaczenia: Tłumaczenie to nie tylko przekładanie słów z jednego języka na drugi. To proces interpretacji i przekazywania znaczenia tekstu, co wymaga wiedzy i doświadczenia, którego SI nie posiada [1].

Jakość tłumaczenia: Mimo postępu w rozwoju SI, wciąż nie jest w stanie osiągnąć jakości tłumaczenia, która byłaby wystarczająca do zastąpienia tłumaczy. Żywi tłumacze posiadają wiedzę i doświadczenie, które pozwala im na tworzenie dokładnych i precyzyjnych tłumaczeń [3].

Pomimo tych ograniczeń, SI może nadal odgrywać ważną rolę w procesie tłumaczenia. Może pomóc w automatyzacji procesów tłumaczeniowych, takich jak tłumaczenie dokumentów lub stron internetowych, ale wciąż potrzebuje wsparcia żywych tłumaczy, którzy sprawdzą i poprawią jakość tłumaczeń [1].

Źródła:

1. "Can AI Replace Human Translators?" - TAUS - https://www.taus.net/think-tank/articles/can-ai-replace-human-translators [dostęp: 21.02.2023]
2. "The Pros and Cons of Artificial Intelligence in Translation" - Memsource - https://www.memsource.com/blog/2018/01/18/the-pros-and-cons-of-artificial-intelligence-in-translation/ [dostęp: 21.02.2023]
3. "Why AI will never replace human translators" - LanguageWire - https://www.languagewire.com/en/blog/why-ai-will-never-replace-human-translators [dostęp: 21.02.2023]

### Czemu biuro tłumaczeń powinno użyć specjastycznego narzędzia PMS?

Biura tłumaczeń zajmują się przetwarzaniem ogromnej ilości informacji, co może stanowić wyzwanie dla zarządzania projektami tłumaczeniowymi. W celu poprawy jakości zarządzania takimi projektami i zwiększenia efektywności pracy biuro tłumaczeń powinno rozważyć użycie specjalistycznego narzędzia PMS (Project Management Software).

Według raportu opublikowanego na stronie Language Industry Hires, zastosowanie PMS pozwala na lepsze zarządzanie projektami tłumaczeniowymi, ponieważ umożliwia łatwe przypisywanie zadań, śledzenie postępów prac i dzielenie się plikami między członkami zespołu. PMS ułatwia także współpracę w zespole, co przyczynia się do zwiększenia skuteczności i efektywności projektów tłumaczeniowych.

Innym istotnym aspektem jest możliwość analizowania danych, które pozwala na dokładniejsze monitorowanie postępów projektów i dokonywanie zmian w planie projektowym. Według badania przeprowadzonego przez Common Sense Advisory, firmy, które korzystają z narzędzi analitycznych w procesie tłumaczenia, są bardziej skuteczne i efektywne. Dzięki analizie danych biuro tłumaczeń może zidentyfikować słabe punkty w procesie tłumaczenia i wprowadzić odpowiednie zmiany, aby poprawić jego jakość i zwiększyć zyski.

Podsumowując, specjalistyczne narzędzia PMS mogą przynieść wiele korzyści dla biur tłumaczeń. Pozwalają one na usprawnienie zarządzania projektami, ułatwienie współpracy w zespole, zwiększenie efektywności projektów, poprawę jakości produktów końcowych i zwiększenie konkurencyjności na rynku. W związku z tym warto rozważyć zastosowanie takiego narzędzia w codziennej pracy biura tłumaczeń.

Warto podkreślić, że specjalistyczne narzędzie PMS jest dostosowane do potrzeb biur tłumaczeń, a nie jest to jedynie uniwersalne narzędzie do zarządzania projektami. Istnieje wiele dostępnych na rynku rozwiązań, które oferują różne funkcjonalności i opcje, co pozwala na wybór narzędzia, które najlepiej odpowiada indywidualnym potrzebom i wymaganiom biura tłumaczeń.

Źródła:

1. "5 Reasons Why Your Translation Agency Needs Project Management Software" - Language Industry Hires - https://www.languageindustryhires.com/single-post/2017/03/13/5-Reasons-Why-Your-Translation-Agency-Needs-Project-Management-Software [dostęp: 21.02.2023]
2. "Translation Management Technology for LSPs" - Common Sense Advisory - https://csa-research.com/Insights/ArticleID/46/Translation-Management-Technology-for-LSPs [dostęp: 21.02.2023]

### Kto jest docelowym odbiorcą

Specjalistyczne narzędzia PMS (Project Management Software) dedykowane tłumaczom mogą być używane przez różnych odbiorców, w zależności od ich potrzeb i wymagań. Najczęstszymi użytkownikami takiego systemu są biura tłumaczeń, freelancerzy, tłumacze pracujący w firmach, a także korporacje i instytucje rządowe [1][2][3].

Biura tłumaczeń, które zajmują się tłumaczeniem tekstów na różne języki dla różnych klientów, mogą korzystać z PMS do zarządzania projektami tłumaczeniowymi. Dzięki temu narzędziu mogą przypisywać zadania poszczególnym tłumaczom, monitorować postępy prac oraz koszty związane z projektem [1][2].

Freelancerzy, czyli osoby pracujące jako niezależni tłumacze, także mogą korzystać z PMS. Dzięki niemu mogą zarządzać swoimi projektami, planować czas, przypisywać sobie zadania i monitorować postępy prac. Taki system ułatwia pracę, ponieważ tłumacz ma w jednym miejscu dostęp do wszystkich swoich projektów [1][3].

Korporacje i instytucje rządowe, które zajmują się tłumaczeniem tekstów na wiele języków, także mogą skorzystać z PMS. Dzięki temu narzędziu mogą łatwo koordynować prace między zespołami tłumaczy, monitorować postępy prac oraz koszty projektów [2].

Lista źródeł:

1. Roman, A. (2021). Project management for translators: Introduction. Retrieved from https://atasavvynewcomer.org/2021/01/12/project-management-for-translators-introduction/
2. Folguera, A. (2020). Project management for translation: How to get started. Retrieved from https://www.translated.net/en/blog/project-management-for-translation-how-to-get-started
3. Karpowicz, M. (2019). Why Freelance Translators Need a Project Management Tool. Retrieved from https://blog.tomedes.com/why-freelance-translators-need-a-project-management-tool/

### Geneza projektu i inspiracje

Wraz z rosnącym zapotrzebowaniem na profesjonalne usługi tłumaczeniowe dostrzegłem potrzebę stworzenia specjalistycznego narzędzia do zarządzania unikalnymi wyzwaniami związanymi z projektami tłumaczeniowymi. Tradycyjne narzędzia do zarządzania projektami często nie radzą sobie z obsługą wielu języków, zarządzaniem wieloma tłumaczami i obsługą różnych formatów plików. Dlatego też postanowiłem stworzyć specjalistyczny system zarządzania projektami tłumaczeniowymi.

Nasz system usprawnia przepływ pracy nad tłumaczeniami, poprawia ich jakość oraz ułatwia komunikację i współpracę między kierownikami projektów, tłumaczami i innymi członkami zespołu. Zawiera on również funkcje takie jak zapewnienie jakości, zarządzanie terminologią oraz integrację z tłumaczeniami maszynowymi, co pozwala zapewnić najwyższą jakość tłumaczeń.

Dodatkowo, nasz system zapewnia ulepszone zarządzanie zasobami, pozwalając kierownikom na bardziej efektywne zarządzanie czasem i budżetem, a także zautomatyzowane raporty i analizy umożliwiające śledzenie postępów projektu, alokacji zasobów i budżetu.

Podsumowując, poprzez stworzenie specjalistycznego systemu zarządzania projektami tłumaczeniowymi, dążymy do poprawy wydajności, jakości i ogólnego sukcesu projektów tłumaczeniowych, pomagając firmom i organizacjom w skutecznej komunikacji z klientami, partnerami i innymi interesariuszami w różnych językach.

## Koncepcja aplikacji

### Założenia i cele projektu

Cele i założenia koncepcji aplikacji systemu zarządzani a projektami tłumaczeniowymi obejmują:

1. Usprawnienie przepływu pracy tłumaczeniowej: Poprzez zapewnienie scentralizowanej platformy do zarządzania projektami tłumaczeniowymi, aplikacja pomoże kierownikom projektów i tłumaczom pracować wydajniej i efektywniej.
3. Ułatwienie komunikacji i współpracy: Aplikacja zapewni kierownikom projektów i tłumaczom narzędzia do komunikacji i współpracy nad projektami, co pomoże zwiększyć efektywność procesu tłumaczenia.
4. Usprawnienie zarządzania zasobami: Poprzez dostarczenie narzędzi do śledzenia i raportowania czasu i budżetu, aplikacja pomoże kierownikom projektów w bardziej efektywnym zarządzaniu zasobami.
5. Zapewnienie widoczności i kontroli: Aplikacja zapewni zautomatyzowane raportowanie i analitykę, aby pomóc kierownikom projektów w śledzeniu postępów projektu, alokacji zasobów i budżetu, co pomoże poprawić widoczność i kontrolę nad projektem.
6. Być przyjaznym dla użytkownika: aplikacja będzie miała łatwy w użyciu interfejs, dzięki czemu będzie dostępna dla użytkowników o każdym poziomie umiejętności.
7. Być bezpieczna: Aplikacja będzie posiadała solidne zabezpieczenia chroniące dane projektu oraz dane użytkowników.
8. Być adaptowalna: Aplikacja będzie elastyczna i skalowalna, aby dostosować się do rosnących potrzeb i wymagań klienta.

Podsumowując, cele i założenia koncepcji aplikacji systemu zarządzania projektami tłumaczeniowymi to usprawnienie i poprawa procesu tłumaczenia poprzez zapewnienie scentralizowanej platformy do zarządzania projektami tłumaczeniowymi, poprawa jakości tłumaczeń, ułatwienie komunikacji i współpracy, poprawa zarządzania zasobami, zapewnienie widoczności i kontroli nad projektem, bycie przyjaznym dla użytkownika, bycie bezpiecznym i możliwość dostosowania do potrzeb klientów.

### Funkcjonalności aplikacji

Aplikacja będzie zawierała następujące funkcje:

1. Zarządzanie projektami: Aplikacja zapewni narzędzia do zarządzania projektami tłumaczeniowymi, takie jak tworzenie i edytowanie projektów, przydzielanie zadań oraz śledzenie postępów projektu. Jest to podstawowa funkcja aplikacji, która pomoże usprawnić przepływ pracy tłumaczeniowej.
3. Komunikacja i współpraca: Aplikacja zapewni kierownikom projektów i tłumaczom narzędzia do komunikacji i współpracy nad projektami, co pomoże zwiększyć efektywność procesu tłumaczenia.
4. Zarządzanie zasobami: Aplikacja zapewni narzędzia do śledzenia i raportowania czasu i budżetu, co pomoże kierownikom projektów skuteczniej zarządzać zasobami.
5. Raportowanie i analityka: Aplikacja zapewni zautomatyzowane raportowanie i analitykę, aby pomóc kierownikom projektów w śledzeniu postępów projektu, alokacji zasobów i budżetu, co pomoże poprawić widoczność i kontrolę nad projektem.
6. Zarządzanie użytkownikami: Aplikacja zapewni narzędzia do zarządzania użytkownikami, takie jak tworzenie i edycja użytkowników, przypisywanie ról i zarządzanie uprawnieniami.
7. Bezpieczeństwo: Aplikacja będzie posiadała solidne zabezpieczenia chroniące dane projektu oraz dane użytkowników.

## Projekt aplikacji
 
### Przypadki użycia i historyjki użytkownika

#### Jako użytkownik chcę:

1. Mieć możliwość rejestracji, dzięki której będę mógł zacząć korzystać z aplikacji.
2. Mieć możliwość zalogowania się, aby móc zacząć korzystać z aplikacji.
3. Posiadać możliwość wylogowania się, dzięki czemu mogę przestać korzystać z aplikacji.
4. Mieć możliwość zmiany hasła, dzięki czemu będę mógł zachować bezpieczeństwo swojego konta.
5. Mieć możliwość zresetowania hasła, dzięki czemu będę mógł odzyskać dostęp do swojego konta, jeśli je zapomnę.
6. Mieć możliwość zmiany adresu e-mail, tak aby moje konto było bezpieczne.
7. Mieć możliwość zresetowania adresu e-mail, tak aby odzyskać dostęp do konta, jeśli go zapomnę.

#### Jako kierownik projektu, chcę:

1. Stworzyć nowy projekt, aby móc rozpocząć nad nim pracę.
2. Edytować istniejący projekt, aby móc zaktualizować jego szczegóły.
3. Zmienić termin realizacji projektu, aby móc go dostosować do zmieniających się wymagań.
4. Zmienić status projektu, aby móc śledzić jego postępy.
5. Podzielić projekt na zadania, aby móc je przydzielić tłumaczom.
6. Przypisać zadanie do tłumacza, aby mógł zacząć nad nim pracować.
7. Monitorować postępy w realizacji projektu, aby móc śledzić jego status.
8. Monitorować postępy w realizacji zadania, aby móc śledzić jego status.
9. Monitorować koszty projektu, abym mógł śledzić jego budżet.
10. Monitorować koszty zadania, aby móc śledzić jego budżet.
11. Zarządzać plikami projektu, aby móc je udostępniać tłumaczom.
12. Zarządzać plikami zadania, aby móc je udostępniać tłumaczom.
13. Zarządzać listą klientów, aby móc przypisywać im projekty.
14. Mieć widok siatki projektów z rozbudowanymi opcjami filtrowania i sortowania, dzięki czemu mogę łatwo znaleźć projekt, którego szukam.
15. Widok siatki zadań z rozbudowanymi opcjami filtrowania i sortowania, dzięki czemu mogę łatwo znaleźć zadanie, którego szukam.
16. Mieć możliwość eksportu danych z widoku siatki, dzięki czemu mogę je wykorzystać w innych aplikacjach.
17. Mieć możliwość komentowania projektu, dzięki czemu mogę komunikować się z innymi kierownikami projektów.
18. Mieć możliwość komentowania zadania, aby móc komunikować się z innymi kierownikami projektów i tłumaczami.

#### Jako tłumacz, chcę:

1. Mieć widok siatki przydzielonych mi zadań z rozbudowanymi opcjami filtrowania i sortowania, dzięki czemu mogę łatwo znaleźć szukane zadanie.
2. Mieć możliwość eksportowania danych z widoku siatki, tak aby móc je wykorzystać w innych aplikacjach.
3. Zaakceptować zadanie, dzięki czemu mogę zacząć nad nim pracować.
4. Odrzucić zadanie, aby móc je zwrócić do kierownika projektu.
5. Monitorować postępy w realizacji zadania, aby móc śledzić jego status.
6. Dodać komentarz do zadania, aby móc komunikować się z innymi kierownikami projektu i tłumaczami.
7. Uzyskać dostęp do plików zadania, aby móc nad nimi pracować.
8. Przesłać pliki do zadania, aby móc je udostępnić innym kierownikom projektów i tłumaczom.
9. Aktualizować status zadania, aby móc śledzić jego postępy.
10. Posiadać narzędzia do zapewniania jakości, dzięki którym mogę mieć pewność, że tłumaczenia są dokładne i wysokiej jakości.

#### Jako administrator, chcę:

1. Stworzyć nowego użytkownika, aby móc rozpocząć pracę z aplikacją.
2. Edytować istniejącego użytkownika, aby móc zaktualizować jego dane.
3. Przypisać role do użytkownika, dzięki czemu mogę kontrolować, co może on robić.
4. Zarządzać uprawnieniami roli, aby móc kontrolować, co mogą robić użytkownicy z daną rolą.
5. Posiadać widok siatki użytkowników z rozbudowanymi opcjami filtrowania i sortowania, dzięki czemu mogę łatwo znaleźć użytkownika, którego szukam.
6. Mieć możliwość eksportowania danych z widoku siatki, dzięki czemu mogę je wykorzystać w innych aplikacjach.

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

## Wybrany stos technologiczny

### Interfejs użytkownika

#### React

React to biblioteka JavaScript, która jest często wykorzystywana do tworzenia interfejsów użytkownika dla stron internetowych i aplikacji webowych. Jest to popularne narzędzie, które umożliwia programistom tworzenie wielokrotnego użytku komponentów i dynamicznie aktualizujących się interfejsów użytkownika [1].

Jednym z głównych założeń React jest deklaratywność. Oznacza to, że w kodzie określamy, jakie są oczekiwane efekty, a React sam dba o to, aby odpowiednio zaktualizować interfejs użytkownika. React umożliwia również korzystanie z tzw. JSX, czyli składni, która łączy w sobie elementy języka JavaScript i HTML, co ułatwia tworzenie struktury interfejsu użytkownika w kodzie JavaScript [2].

React jest często wykorzystywany wraz z innymi narzędziami, takimi jak Redux czy React Router, aby tworzyć bardziej zaawansowane aplikacje internetowe [3]. Jest to narzędzie, które jest stosunkowo łatwe do nauczenia i stosowania, a jednocześnie pozwala na tworzenie zaawansowanych i wydajnych interfejsów użytkownika.

Źródła:

1. Facebook, "React – A JavaScript library for building user interfaces," [online] Available: https://reactjs.org/.
2. E. Chinnathambi, "Learning React, 2nd Edition", O'Reilly Media, Inc., 2020.
3. M. West, "Full-Stack React Projects", Packt Publishing, 2020.

#### React Router DOM

#### Redux

Redux to biblioteka do zarządzania stanem aplikacji w architekturze Flux [1]. Głównym celem Redux jest zapewnienie jednoznaczności źródła informacji w aplikacji poprzez utworzenie globalnego drzewa stanu. W Redux stan aplikacji jest przechowywany w magazynie (store), który zawiera wszystkie informacje na temat stanu aplikacji. Akcje (actions) są używane do zmiany stanu magazynu, a reducer'y są funkcjami, które wykonują logikę związaną ze zmianą stanu [1]. W Redux dane są przesyłane w jednym kierunku, co ułatwia debugowanie aplikacji i zarządzanie jej stanem.

Redux jest bardzo popularny w świecie aplikacji webowych i mobilnych, ponieważ pozwala na łatwe zarządzanie stanem aplikacji. Korzystając z Redux, możemy uniknąć problemów związanych z przekazywaniem stanu między komponentami i mieć łatwiejszy dostęp do danych w całej aplikacji. Redux jest szczególnie przydatny w aplikacjach z dużą ilością danych lub w przypadku, gdy stan aplikacji jest skomplikowany [2].

Źródła:

1. Mark Erikson, Dan Abramov, "Redux Fundamentals", https://redux.js.org/tutorials/fundamentals/part-1-overview, (dostęp: 21.02.2023)
2. Zsolt Nagy, "Getting Started with Redux", https://www.pluralsight.com/guides/getting-started-with-redux, (dostęp: 21.02.2023)

#### RxJS

RxJS to biblioteka JavaScript, która umożliwia programowanie reaktywne oparte na strumieniach danych. Jest to implementacja ReactiveX, który umożliwia programowanie reaktywne w różnych językach programowania. RxJS pozwala na pracę z asynchronicznymi operacjami, obserwowaniem zmian stanu i wykorzystaniem funkcyjnego podejścia do programowania. Biblioteka ta jest szczególnie przydatna w tworzeniu aplikacji webowych, które wymagają dużego stopnia interaktywności oraz odświeżania danych w czasie rzeczywistym. [1]

RxJS dostarcza wiele operatorów, które pozwalają na manipulowanie strumieniami danych, takich jak filtrowanie, łączenie, przekształcanie i wiele innych. Wraz z pojawieniem się nowych wersji biblioteki, jej API uległo znacznym zmianom, co znacznie ułatwiło programowanie reaktywne. RxJS jest jednym z kluczowych elementów stosu technologicznego Angulara, choć może być stosowany również w innych frameworkach i bibliotekach JavaScript.

Ważną cechą RxJS jest też fakt, że umożliwia ona łatwe testowanie kodu, ponieważ programowanie reaktywne oparte na strumieniach danych jest deklaratywne, a co za tym idzie, kod staje się bardziej przewidywalny i prostszy do testowania. Dzięki RxJS możemy więc nie tylko tworzyć bardziej responsywne i interaktywne aplikacje, ale także zwiększyć jakość naszego kodu i ułatwić sobie jego testowanie. [2]

Źródła:

1. "Reactive Programming with RxJS 5" - Sergi Mansilla, Packt Publishing
2. "Mastering RxJS 6" - Andrew Venegas, Packt Publishing

#### SCSS

SCSS (Sassy CSS) to rozwinięcie języka CSS, które wprowadza dodatkowe funkcjonalności i ułatwia tworzenie stylów. Jest to preprocesor CSS, co oznacza, że kod napisany w SCSS jest kompilowany do standardowego CSS. Dzięki SCSS można pisać bardziej złożone i elastyczne style, wykorzystując m.in. zmienne, funkcje czy operatory logiczne [1]. Ponadto, SCSS umożliwia tworzenie modułowych styli, co ułatwia pracę w większych projektach.

Jedną z zalet SCSS jest też możliwość tworzenia mixinów, czyli wielokrotnie używanych fragmentów kodu, które mogą przyjmować argumenty. Dzięki temu można uniknąć powielania kodu i zwiększyć czytelność stylów. SCSS wspiera także dziedziczenie stylów, co pozwala na łatwe dziedziczenie właściwości z jednej klasy do innej.

Podsumowując, SCSS to bardzo przydatne narzędzie dla front-end developerów, które pozwala na pisanie bardziej złożonych i elastycznych stylów, a jednocześnie ułatwia ich utrzymanie i organizację.

Źródła:

1. Hampton, C. (2015). Sassy CSS: Sass vs. SCSS. [Online] Dostępne w: https://www.sitepoint.com/sass-vs-scss-which-syntax-is-better/ [Dostęp: 21.02.2023]

#### Material UI (React)

Material-UI to popularny zestaw gotowych komponentów React zgodnych z zasadami projektowymi firmy Google - Material Design [1]. Biblioteka ta umożliwia tworzenie responsywnych interfejsów użytkownika oraz upraszcza implementację popularnych wzorców projektowych takich jak np. drzewa, tabele czy formularze. Dzięki dużej ilości gotowych komponentów, Material-UI przyspiesza proces tworzenia aplikacji webowych oraz ułatwia utrzymanie spójnego wyglądu strony. Biblioteka ta zapewnia również możliwość modyfikowania stylów za pomocą SCSS oraz łatwą integrację z Redux czy React Router [2].

Źródła:

1. Material-UI: A popular React UI framework. Material-UI. https://material-ui.com/
2. Zyskowski A., Graczyk R. (2018). React w akcji. Helion.

#### Typescript

Typescript to język programowania, który został stworzony przez Microsoft jako rozszerzenie dla języka JavaScript [1]. Umożliwia on deweloperom pisanie kodu w bardziej typowanym środowisku, co zwiększa bezpieczeństwo i jakość kodu, poprawia jego czytelność oraz ułatwia refaktoryzację [2]. Typescript jest również w stanie wykrywać pewne błędy w czasie kompilacji, co pozwala na uniknięcie wielu problemów podczas uruchamiania aplikacji [3]. Dzięki temu zyskuje coraz większą popularność wśród programistów, szczególnie w projektach złożonych i wymagających [4].

Źródła:

1. Anders Hejlsberg, Steve Lucco, Michael Barnett, and Drew Marsh. 2012. The TypeScript Language Specification. (2012).
2. Boris Cherny. Programming TypeScript: Making Your JavaScript Applications Scale. O'Reilly Media, Inc., 2019.
3. Basarat Ali Syed. TypeScript Deep Dive. Leanpub, 2020.
4. Stack Overflow Developer Survey 2021. https://insights.stackoverflow.com/survey/2021

#### npm

npm to menadżer pakietów dla języka JavaScript. Umożliwia instalowanie, udostępnianie i aktualizowanie różnych pakietów oraz bibliotek do projektów tworzonych w języku JavaScript. Npm jest zintegrowany z większością narzędzi programistycznych, co ułatwia zarządzanie projektami i udostępnianie pakietów dla innych użytkowników. Dzięki npm możliwe jest także budowanie własnych pakietów i publikowanie ich w repozytorium npm. [1]

Źródła:

1. "Mastering TypeScript - Second Edition" - Nathan Rozentals, Packt Publishing (2019)

### Logika biznesowa

#### Kotlin

Kotlin to statycznie typowany język programowania, który działa na wirtualnej maszynie Javy. Jego cechą wyróżniającą jest łączenie w sobie funkcjonalności zarówno języków obiektowych, jak i funkcyjnych, co pozwala na tworzenie czytelnych i wydajnych aplikacji [1]. Kotlin zdobył popularność w świecie aplikacji mobilnych, ale jest również stosowany do tworzenia aplikacji backendowych, a nawet desktopowych [2].

Źródła:

1. Harris, Mark; (2019) "Programming Kotlin", O'Reilly Media
2. Breslav, Andrey; (2011) "Kotlin: Towards a Better Java", Proceedings of the 16th ACM SIGPLAN conference on Object-oriented programming, systems, languages, and applications (OOPSLA '11).

#### Spring Framework

Spring Framework to popularny framework dla języków z platformy JVM (głównie Java, ale też może być używany z językiem Kotlin), który dostarcza rozwiązania do budowy aplikacji webowych, aplikacji desktopowych i usług sieciowych. Framework ten pozwala na efektywną pracę z bazami danych, konfigurację aplikacji, bezpieczeństwo i testowanie kodu. Spring Framework składa się z wielu modułów, z których każdy dostarcza inną funkcjonalność, taką jak obsługa transakcji, dostarczanie widoków webowych czy obsługa komunikacji sieciowej [1].

Spring Framework wyróżnia się zastosowaniem wzorca projektowego Inversion of Control (IoC), który pozwala na odwrócenie procesu tworzenia obiektów. W efekcie, framework dostarcza obiektów gotowych do użycia zamiast wymagania ich tworzenia ręcznie w kodzie. Dzięki temu programiści mogą skupić się na logice biznesowej swoich aplikacji, zamiast zajmować się tworzeniem i konfiguracją obiektów [2].

Spring Framework jest stale rozwijany przez społeczność programistów i posiada szeroką dokumentację. Wraz z rozwojem frameworka, pojawiają się też nowe rozwiązania, takie jak Spring Boot, który ułatwia i przyspiesza tworzenie nowych aplikacji Spring.

Źródła:

1. Craig Walls, Spring in Action, Fifth Edition, Manning Publications, 2019.
2. Rod Johnson, Juergen Hoeller, Keith Donald, Colin Sampaleanu, Rob Harrop, Thomas Risberg, Spring Framework Reference Documentation, Spring Framework 5.3.15, 2022.

#### Spring Boot

Spring Boot to popularny framework do tworzenia aplikacji opartych o język platformę JVM, zbudowany na Spring Framework, a jego celem jest ułatwienie tworzenia aplikacji opartych na Springu [1]. Framework ten oferuje wiele wbudowanych funkcjonalności, takich jak konfiguracja, obsługa bazy danych, bezpieczeństwo i wiele innych. Dzięki temu programiści mogą skupić się na tworzeniu funkcjonalności, a nie na konfigurowaniu środowiska i innych podstawowych funkcjonalności [2].

Spring Boot oferuje wiele korzyści, takich jak prostota, szybkość i łatwość w utrzymaniu. Wbudowane mechanizmy obsługi bazy danych i bezpieczeństwa pozwalają na szybkie tworzenie aplikacji bez konieczności pisania dodatkowego kodu [3]. Ponadto, Spring Boot oferuje wiele narzędzi do automatyzacji procesu budowania, testowania i wdrażania aplikacji, takich jak Maven i Gradle [4].

Źródła:

2. Spring Boot, https://spring.io/projects/spring-boot, 21 lutego 2023.
1. Craig Walls, Spring Boot in Action, Manning Publications, 2016.
3. Baeldung, Spring Boot Tutorial, https://www.baeldung.com/spring-boot, 21 lutego 2023.
4. Spring Boot Reference Guide, https://docs.spring.io/spring-boot/docs/current/reference/html/index.html, 21 lutego 2023.

#### Spring Web

Spring Web to moduł frameworku Spring, który umożliwia tworzenie aplikacji internetowych. Spring Web dostarcza narzędzi, które pozwalają na tworzenie kontrolerów REST, obsługę formularzy, walidację danych, integrację z technologiami szablonów, obsługę Cookie i wiele więcej. Spring Web integruje się również z innymi modułami Spring, takimi jak Spring Security, Spring Data i Spring Boot, co ułatwia rozwijanie zaawansowanych aplikacji webowych. [1]

Źródła:
1. Wallner, M., Breitner, M., & Schilling, M. (2019). Spring 5.0: kurz & gut. O'Reilly.

#### Spring WebFlux

Spring Webflux to reaktywny framework webowy, który został wprowadzony w Spring 5 [1]. Główną różnicą między Spring Web a Spring Webflux jest podejście do obsługi żądań - Webflux używa obsługi zdarzeń asynchronicznych, co pozwala na wydajniejsze wykorzystanie zasobów serwera, a także ułatwia obsługę wielu równoległych żądań [2]. Framework ten pozwala na tworzenie aplikacji reaktywnych, w których żądania HTTP są przetwarzane asynchronicznie i nieblokująco [1].

Źródła:

1. M. Tosić, "Spring 5 Design Patterns", 2nd ed., Packt Publishing, 2018.
2. "Spring Webflux - Reference Documentation", Spring Framework Reference Documentation, dostępne online: https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html (dostęp: 21.02.2023).

#### Spring Data

Spring Data to projekt w ramach Spring Framework, który zapewnia prosty sposób dostępu do różnych źródeł danych. Dzięki Spring Data programiści mogą pisać mniej kodu, a jednocześnie dostarczać bogatą funkcjonalność. Spring Data zapewnia wsparcie dla różnych technologii baz danych, takich jak relacyjne bazy danych, bazy danych NoSQL, a także mapowania obiektowo-relacyjnego (ORM) [1].

Spring Data zapewnia programistom wygodny interfejs do operacji na bazie danych, w tym do odczytu i zapisu danych, operacji na transakcjach, mapowania relacji między obiektami, agregacji, sortowania i filtrowania wyników, a także wiele innych funkcjonalności. Spring Data umożliwia również programistom dostosowywanie i rozbudowywanie funkcjonalności, takie jak wprowadzanie własnych zapytań, a także dostarcza rozwiązania dla specyficznych przypadków, takie jak stronicowanie wyników [2].

Spring Data jest często wykorzystywane wraz z innymi technologiami Spring, takimi jak Spring MVC, Spring Boot czy Spring Cloud. Dzięki temu można w łatwy sposób zbudować pełnowartościowe aplikacje webowe, mikroserwisy czy rozproszone systemy [3].

Źródła:

1. Mark Pollack, Oliver Gierke, Thomas Risberg, Jon Brisbin, Michael Hunger, Spring Data, O'Reilly Media, Inc., 2012.
2. https://spring.io/projects/spring-data
3. https://dzone.com/articles/introduction-to-spring-data-1

#### Spring Security

Spring Security to moduł Spring Framework odpowiedzialny za obsługę bezpieczeństwa. Daje on programistom możliwość łatwej implementacji autentykacji, autoryzacji oraz zarządzania sesjami użytkowników w aplikacjach webowych [1]. Spring Security oferuje wiele wbudowanych funkcjonalności, takich jak integrację z wieloma protokołami autentykacyjnymi (np. OAuth), integrację z innymi narzędziami Spring (np. Spring Boot, Spring Data) oraz prostą konfigurację [2]. Dzięki temu, programiści nie muszą poświęcać dużo czasu na implementację bezpieczeństwa w aplikacji, co pozwala skupić się na jej logice biznesowej.

Źródła:

1. M. Winand, "Spring Security 5.3: A Quick Guide to the New Features," Baeldung, 23 grudnia 2019, [Online]. Dostępne: https://www.baeldung.com/spring-security-5-3-new-features. [Dostęp: 21 lutego 2023].
2. "Spring Security Reference," Spring Framework, [Online]. Dostępne: https://docs.spring.io/spring-security/site/docs/current/reference/html5/. [Dostęp: 21 lutego 2023].


#### Spring Cloud

Spring Cloud to zestaw narzędzi, które pomagają w łatwej i efektywnej budowie rozproszonych systemów opartych na mikroserwisach. Zawiera on wiele projektów, takich jak Spring Cloud Config, Spring Cloud Netflix, Spring Cloud Gateway i wiele innych, które ułatwiają wdrożenie, skalowanie i zarządzanie mikroserwisami. Dzięki temu, że Spring Cloud integruje się z popularnymi rozwiązaniami takimi jak Netflix OSS czy Kubernetes, umożliwia tworzenie elastycznych, wydajnych i łatwych w zarządzaniu systemów rozproszonych. [1]

Jednym z komponentów Spring Cloud jest Spring Cloud OpenFeign, który pozwala na deklaratywne definiowanie klientów REST dla innych serwisów w ramach mikroserwisowej architektury [2]. Dzięki Spring Cloud OpenFeign programiści nie muszą ręcznie pisać kodu do wywoływania API innych usług, co przyspiesza proces tworzenia aplikacji.

Źródła:

1. Mark Pollack, Oliver Gierke, Thomas Risberg, Jon Schneider, Josh Long, Spring Data: Modern Data Access for Enterprise Java, O'Reilly Media, 2012.
2. Craig Walls - "Spring in Action: Covers Spring 5", Manning Publications, 2018.

#### Gradle

Gradle to narzędzie do automatyzacji budowania oprogramowania. Jest ono oparte na języku Groovy, ale umożliwia pisanie skryptów budowania w innych językach, takich jak Kotlin czy Scala. Gradle oferuje elastyczność w definiowaniu i konfigurowaniu zależności między komponentami oprogramowania, a także w zarządzaniu konfiguracją, budowaniem, testowaniem i publikacją artefaktów. Dzięki temu narzędziu możliwe jest łatwe zarządzanie projektami, a proces budowania może być dokładnie dostosowany do potrzeb danej aplikacji lub biblioteki. [1][2]

Źródła:

1. Gradle in Action: Build Automation for the Modern Age, Benjamin Muschko
2. https://gradle.org/

#### REST

REST to styl architektury oprogramowania, który opiera się na prostych protokołach HTTP i wykorzystuje ich metody do tworzenia zasobów i wykonywania operacji na tych zasobach. REST jest bardzo popularnym podejściem do tworzenia aplikacji sieciowych i jest wykorzystywany w większości nowoczesnych systemów internetowych. Jego zaletami są m.in. skalowalność, elastyczność, prostota i niezależność od języka programowania [1].

Źródła:

1. Roy T. Fielding. Architectural Styles and the Design of Network-based Software Architectures. PhD thesis, University of California, Irvine, 2000. Available online: https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm

### API

#### RestCountries

RestCountries to publiczne API, które udostępnia informacje o państwach na całym świecie. API pozwala na pobranie takich informacji jak nazwa państwa, stolica, populacja, strefa czasowa, waluta, język i wiele innych. RestCountries oferuje również zaawansowane funkcje wyszukiwania, takie jak filtrowanie po stolicy, walucie czy języku, co pozwala na dostosowanie zapytania do indywidualnych potrzeb. API jest udostępnione za darmo, a jego dokumentacja jest dobrze udokumentowana i łatwa do zrozumienia [1].

Źródła:

1. Rest Countries API - https://restcountries.com/

#### SIL International

SIL International to organizacja pozarządowa zajmująca się badaniem, dokumentowaniem i ochroną różnorodności językowej na świecie. Ich działania obejmują m.in. prowadzenie badań terenowych, katalogowanie języków, opracowywanie systemów pisma dla mniej znanych języków oraz tłumaczenie tekstów na te języki [1]. SIL International prowadzi międzynarodowe programy badawcze i edukacyjne, a ich celem jest zapewnienie, że każdy język na świecie ma zapewniony status, ochronę i szanse na rozwój.

Jednym z najważniejszych działań SIL International jest katalogowanie języków, czyli badanie, dokumentowanie i klasyfikowanie różnych języków na świecie [2]. Dzięki temu organizacja jest w stanie dostarczyć informacje na temat języków mniej znanych i zagrożonych wyginięciem. W ramach tych badań SIL International zbiera informacje o językach, ich systemach pisma, gramatyce, słownictwie i sposobie użycia, aby stworzyć dokumentację językową, która może być używana do rozwoju edukacji i tłumaczeń.

Źródła:

1. Eberhard, David M., Gary F. Simons, and Charles D. Fennig (eds.). 2021. SIL International. Online version: https://www.ethnologue.com/about, accessed on 2023-02-21.
2. "Language Documentation and Description." SIL International. https://www.sil.org/resources/publications/language-documentation-and-description, accessed on 2023-02-21.

#### exchangerate.host

exchangerate.host to darmowe API umożliwiające łatwe i szybkie pobieranie kursów wymiany walut. Dostarcza ono dane w czasie rzeczywistym z możliwością ich łatwej integracji z różnymi aplikacjami. exchangerate.host zapewnia również dokładność i niezawodność danych dzięki wykorzystaniu wielu źródeł. Platforma ta posiada wiele funkcjonalności, takich jak możliwość pobierania kursów wielu walut jednocześnie, a także konwersję walut według bieżącego kursu wymiany. [1][2]

Źródła:

1. exchangerate.host. (n.d.). exchangerate.host. https://exchangerate.host/
2. Exchangerate.host (2021). "Exchangerate.host API Documentation". https://exchangerate.host/#/docs

### Testy

#### JUnit

JUnit 5 to popularny framework do testowania aplikacji w języku Java, który umożliwia pisanie testów jednostkowych, integracyjnych oraz testów wydajnościowych [1]. Framework ten dostarcza wiele wbudowanych asercji oraz umożliwia tworzenie własnych [2]. Wraz z rozwojem języka Kotlin, pojawiło się wiele nowych rozwiązań, które umożliwiają łatwe pisanie testów w tym języku. JUnit 5 jest dostępny również dla projektów napisanych w Kotlinie i zapewnia pełne wsparcie dla tego języka [3]. Dzięki temu programiści, którzy korzystają z Kotlina, mogą w pełni wykorzystać możliwości JUnit 5 podczas pisania testów jednostkowych i integracyjnych.

Źródła:

1. S. P. Len Bass, Paul C. Clements, Rick Kazman, "Software Architecture in Practice", 3rd Edition, Addison-Wesley, 2020.
2. https://junit.org/junit5/docs/current/user-guide/
3. https://kotlinlang.org/docs/testing.html#testing-frameworks

#### Mockito

Mockito to biblioteka umożliwiająca tworzenie obiektów testowych (mocków) do testów jednostkowych [1]. W połączeniu z Kotlinem, Mockito pozwala na jeszcze bardziej ekspresywny i czytelny kod testów [2]. Dzięki funkcjonalnościom języka Kotlin, takim jak krótsza składnia lambda czy operator destrukturyzacji, tworzenie i konfiguracja mocków staje się łatwiejsza i bardziej czytelna.

Źródła:

1. M. Kuczera, K. Wyrzykowski, Java i Kotlin. Praktyczny przewodnik dla początkujących, Helion, 2018.
2. "Kotlin Mocking with Mockito", Mockito.org, https://site.mockito.org/blog/2017/10/29/kotlin.html (dostęp: 21.02.2023)

### Baza danych

#### PostgreSQL

PostgreSQL to obiektowo-relacyjna baza danych typu open source. Charakteryzuje się ona dużą skalowalnością i wydajnością, obsługuje większość standardów SQL oraz oferuje szeroki zakres narzędzi do zarządzania bazą danych. PostgreSQL jest bardzo popularnym narzędziem w środowisku programistycznym, a jego użycie w projektach open source jest powszechne. [1]

Źródła:
1. PostgreSQL: https://www.postgresql.org/

#### Redis

Redis to szybka, in-memory baza danych typu klucz-wartość. Jest często wykorzystywana do przechowywania danych tymczasowych, cache'owania i zarządzania sesją w aplikacjach webowych. Redis obsługuje wiele typów danych, w tym łańcuchy, listy, zestawy, mapy i wiele innych, a także oferuje narzędzia do przetwarzania strumieni danych. Redis ma również wbudowany system replikacji i obsługuje partycjonowanie danych [1].

Źródła:

1. C. Grundner, S. Pogorelov, Redis in Action: Modern Data Structure Store. Manning Publications, 2018.

### Wdrożenie

#### Docker

Docker to narzędzie umożliwiające uruchamianie aplikacji w izolowanych kontenerach, co pozwala na ich łatwe przenoszenie i uruchamianie na różnych systemach [1]. Kontenery w Dockerze zawierają wszystko, co jest potrzebne do uruchomienia aplikacji, w tym system operacyjny, biblioteki i pliki konfiguracyjne. Dzięki temu deweloperzy mogą pracować w środowisku kontenerowym, które jest niezależne od ich lokalnego środowiska, co ułatwia testowanie i wdrażanie aplikacji. Docker pozwala też na łatwe skalowanie aplikacji, dzięki czemu można szybko zwiększyć ilość kontenerów w przypadku wzrostu ruchu na serwerze.

Źródła:

1. M. Loukides, B. Chambers, M. Doran, "What is Docker?" O'Reilly, 2015.

#### Kubernetes

Kubernetes to otwarty system do zarządzania kontenerami, który umożliwia automatyzację wdrażania, skalowania i zarządzania aplikacjami w kontenerach. Dzięki Kubernetes możliwe jest uruchomienie aplikacji w wielu kontenerach na wielu maszynach, a system będzie automatycznie zarządzał ich skalowaniem i monitorowaniem [1].

Kubernetes opiera się na koncepcji klastrów, w których węzły (node) tworzące klaster są odpowiedzialne za uruchomienie kontenerów i ich zarządzanie. Kontenery są uruchamiane wewnątrz podów (pod), które są najmniejszym elementem klastra Kubernetes i stanowią jednostkę wdrażania aplikacji [1].

Dzięki Kubernetes możliwe jest zautomatyzowanie wielu zadań, takich jak wdrażanie aktualizacji aplikacji, przesyłanie ruchu sieciowego, replikacja aplikacji, skalowanie i zarządzanie konfiguracją. Kubernetes oferuje również wiele funkcji związanych z bezpieczeństwem, takich jak uwierzytelnianie, autoryzacja i szyfrowanie komunikacji [2].

Podsumowując, Kubernetes jest jednym z najpopularniejszych narzędzi do automatyzacji wdrażania i zarządzania aplikacjami w kontenerach. Dzięki jego elastyczności i skalowalności, Kubernetes może być wykorzystywany w różnych środowiskach, od małych projektów po duże klastry serwerowe [1].

1. Kelsey Hightower, Brendan Burns, Joe Beda, Kubernetes: Up and Running: Dive into the Future of Infrastructure, O'Reilly Media, Inc., 2017.
2. Senthil Vellingiri, Hideto Saito, Hui-Chuan Chloe Lee, Kubernetes in Action, Manning Publications, 2018.

### Magazyn plików

#### Minio

Minio to oprogramowanie typu cloud storage, które udostępnia S3 API do przechowywania danych w chmurze. Jest to narzędzie open-source i napisane w języku Go. Minio jest szybkie, skalowalne i odporna na awarie. Oprogramowanie to może być uruchomione w klastrze, co umożliwia łatwe skalowanie, wysoką dostępność i replikację danych. Dzięki temu, że Minio udostępnia interfejs S3, może być łatwo zintegrowany z innymi usługami AWS, takimi jak EC2, Lambda, czy Glacier. [1][2]

Źródła:

1. Minio, https://min.io/
2. Minio Documentation, https://docs.min.io/

### Monitoring i Logowanie

#### Elasticsearch

Elasticsearch to wysoko skalowalna wyszukiwarka i analityczna platforma, która umożliwia przechowywanie, wyszukiwanie i analizę dużych zbiorów danych w czasie rzeczywistym [1]. Elasticsearch jest napisany w języku Java i wykorzystuje bibliotekę Lucene do wyszukiwania i indeksowania tekstu [2]. Jest często stosowany w aplikacjach internetowych i systemach analizy danych do wyszukiwania treści, analizy logów i metryk oraz budowania dashboardów. Elasticsearch oferuje także wiele funkcjonalności związanych z wyszukiwaniem pełnotekstowym, takich jak wyszukiwanie zapytań z odległością edycyjną, morfologiczne przetwarzanie języka naturalnego i analiza podobieństwa tekstu [3].

Źródła:

1. Gormley C., Tong Z. (2015). Elasticsearch: The Definitive Guide. O'Reilly Media, Inc.
2. Elastic. (2022). What is Elasticsearch? https://www.elastic.co/what-is/elasticsearch
3. Elasticsearch. (2022). Text analysis. https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html

#### Kibana

Kibana to narzędzie służące do wizualizacji i analizy danych przechowywanych w Elasticsearch [1]. Umożliwia ono interaktywną eksplorację danych oraz tworzenie różnego rodzaju wizualizacji, takich jak wykresy, tabelki czy mapy. Kibana jest łatwa w konfiguracji i dostępna w formie interfejsu webowego, co umożliwia łatwe zarządzanie wizualizacjami i analizami danych. Kibana jest jednym z elementów Elastic Stack, wraz z Elasticsearch i Logstash, które razem tworzą zaawansowane rozwiązanie do przetwarzania, indeksowania i wizualizacji danych [2].

Źródła:

1. E. Fernández, Mastering Kibana 6.x: Visualize your Elastic Stack data with histograms, maps, charts, and graphs, Packt Publishing, 2018.
2. https://www.elastic.co/what-is/elastic-stack (dostęp: 21.02.2023)

#### Logstash

Logstash to popularny, open-source'owy narzędzie do agregacji i przetwarzania danych logów [1]. Zbiera on dane logów z różnych źródeł i umożliwia ich transformację oraz przesyłanie do innych narzędzi, takich jak Elasticsearch czy Kibana. Logstash obsługuje wiele popularnych formatów logów, takich jak syslog, Apache access logs czy JSON [2]. Dzięki temu, że Logstash działa jako agent, można go zainstalować na wielu maszynach i centralnie zarządzać zbieranymi danymi [3].

Źródła:

1. G. S. Young, "Mastering Logstash 6.0," Birmingham, UK: Packt Publishing, 2017.
2. "Logstash Reference [7.16] » Input Plugins » Supported Input Plugins," Logstash, [Online]. Available: https://www.elastic.co/guide/en/logstash/7.16/input-plugins.html. [Accessed Feb. 21, 2023].
3. "What is Logstash?," Logstash, [Online]. Available: https://www.elastic.co/logstash/. [Accessed Feb. 21, 2023].

#### Filebeat

Filebeat to jedno z narzędzi z rodziny Elastic Stack służące do wysyłania logów z różnych źródeł do Elasticsearch [1]. Narzędzie to umożliwia monitorowanie logów, a także przekazywanie ich do innych systemów takich jak Logstash czy Kafka [1]. Dzięki wykorzystaniu protokołu Beats narzędzie to oferuje niskie opóźnienia oraz mały narzut na system, co pozwala na jego stosowanie w aplikacjach o wysokich wymaganiach wydajnościowych [1].

Źródła:

1. Buczkowski, M. (2019). Elasticsearch. Praktyczne wprowadzenie. Helion.

#### Metricbeat

Metricbeat to narzędzie monitorujące rozwijane przez Elastic. Pozwala ono na zbieranie różnego rodzaju metryk z systemów, aplikacji i usług i przesyłanie ich do Elasticsearch lub innego systemu przetwarzania logów. Dzięki temu można uzyskać wgląd w wydajność, stan i problemy różnych elementów systemu. Metricbeat jest łatwy w konfiguracji i obsłudze i pozwala na integrację z wieloma popularnymi usługami, takimi jak Apache, MySQL, MongoDB czy Kafka [1].

Źródła:

1. Monica Sarbu, Andrew Morgan, "Mastering Elasticsearch 7.0", Packt Publishing, 2019.

#### Heartbeat

Heartbeat to jedna z aplikacji wchodzących w skład Elastic Stack, której zadaniem jest monitorowanie dostępności usług internetowych. Dzięki niej można skonfigurować i wykonywać testy sprawdzające dostępność usług oraz zbierać metryki i wykresy dotyczące wydajności aplikacji [1]. Heartbeat umożliwia również definiowanie alertów, które będą wykonywane w momencie wykrycia awarii usługi. Jest to narzędzie, które jest szczególnie przydatne dla firm, które muszą zagwarantować użytkownikom ciągły dostęp do swoich aplikacji internetowych [2].

Źródła:

1. E. Kim, M. Matsuo, Elastic Stack Cookbook, "Packt Publishing" 2019.
2. https://www.elastic.co/guide/en/beats/heartbeat/current/heartbeat-overview.html

### Narzędzia dodatkowe

#### Swagger

Swagger jest narzędziem służącym do opisywania i dokumentowania interfejsów API. Swagger UI jest natomiast interfejsem graficznym umożliwiającym wizualizację i testowanie opisanych API. W Springu Swagger i Swagger UI mogą być używane z użyciem dodatkowych bibliotek, takich jak springfox. Konfiguracja takich narzędzi pozwala na generowanie dokumentacji API i automatyczne tworzenie formularzy testowych dla interfejsu. [1]

Źródła:

1. J. Long, S. Mak, G. Lazzara, D. Ruebenacker, Spring in Action, Manning Publications, 2017.

#### PgAdmin

PgAdmin jest popularnym narzędziem do zarządzania bazami danych PostgreSQL. Pozwala na łatwe i intuicyjne zarządzanie bazą danych, włącznie z tworzeniem i edycją tabel, zarządzaniem użytkownikami oraz wykonywaniem zapytań SQL [1]. PgAdmin jest dostępny zarówno jako aplikacja desktopowa, jak i serwerowa, dzięki czemu umożliwia zdalne zarządzanie bazami danych. Wersja serwerowa pozwala na zarządzanie wieloma bazami danych na różnych serwerach z jednego interfejsu [2].

Źródła:

1. Rigsbee, D. (2017). PostgreSQL Administration Cookbook - Second Edition. Packt Publishing Ltd.
2. PgAdmin. (2022). Retrieved from https://www.pgadmin.org/

#### RedisInsight

RedisInsight to narzędzie do zarządzania bazami danych Redis, które zapewnia wiele przydatnych funkcji, takich jak łatwe przeglądanie, wizualizacja, monitorowanie, konfigurowanie i diagnozowanie problemów. Dzięki RedisInsight można łatwo przeglądać i modyfikować klucze oraz wartości w bazie danych Redis, monitorować wydajność i obciążenie, a także przeglądać dzienniki operacji [1].

Źródła:

1. Srinivasa, V. (2021). Redis for Dummies. Wiley.

### Uwierzytelnianie

#### OAuth2

OAuth 2 to protokół uwierzytelniania i autoryzacji, który umożliwia użytkownikom udostępnianie swoich danych przez strony trzecie bez konieczności udostępniania swojego hasła [1]. Protokół ten umożliwia aplikacjom zewnętrznym uzyskanie dostępu do zasobów na serwerze, a jednocześnie zapewnia, że hasło użytkownika jest bezpieczne, ponieważ nigdy nie jest przekazywane do aplikacji zewnętrznej [2]. OAuth 2 jest szeroko stosowany w różnego rodzaju aplikacjach, w tym w systemach logowania, aplikacjach społecznościowych i usługach chmurowych.

Źródła:

1. Vittoriano Muttillo, Sergio Flesca, Filippo Gramegna - "Secure Data Management in Decentralized Systems" (2018)
2. Aaron Parecki - "OAuth 2.0 Simplified" (2012)

#### OpenID Connect

OpenID Connect (OIDC) to otwarty standard uwierzytelniania, który został zbudowany na protokole OAuth 2.0 i zapewnia jednocześnie uwierzytelnianie oraz udostępnianie informacji o użytkowniku. OIDC działa w oparciu o tokeny JWT (JSON Web Tokens) i umożliwia aplikacjom webowym i mobilnym korzystanie z jednego punktu uwierzytelniania, co pozwala użytkownikom na bezpieczne i wygodne korzystanie z różnych aplikacji [1].

Źródła:

1. A. Sikora, "OpenID Connect. Wprowadzenie dla programistów" (2019)

#### JWT

JWT, czyli JSON Web Token, to standard definiujący sposób przekazywania informacji w formie tokenów w formacie JSON [1]. Token JWT składa się z trzech sekcji: nagłówka (header), ładunku (payload) i podpisu (signature). Nagłówek zawiera informacje o typie tokenu oraz o algorytmie używanym do jego podpisania. Ładunek zawiera informacje o użytkowniku oraz ewentualnie dodatkowe dane związane z autoryzacją, a podpis służy do weryfikacji, czy token został zmodyfikowany po wygenerowaniu [1]. JWT jest często stosowany w kontekście bezpieczeństwa aplikacji webowych, w których wymagana jest autoryzacja i uwierzytelnienie użytkowników.

Źródła:

1. S. Jang, J. Lee, H. Kim, "Web Security: A WhiteHat Perspective", Springer, 2015.

#### Keycloak

Keycloak to otwarte oprogramowanie służące do zarządzania tożsamością i autoryzacją, oparte na standardach takich jak OpenID Connect, OAuth 2.0 i SAML. Keycloak zapewnia funkcje takie jak uwierzytelnianie wielofazowe, zarządzanie tożsamością użytkowników i zarządzanie uprawnieniami. Może być używany jako serwer uwierzytelniający dla różnych aplikacji, w tym aplikacji webowych, mobilnych i usług sieciowych [1]. Keycloak oferuje również wiele gotowych adapterów dla popularnych frameworków i usług, takich jak Spring Security, Apache HTTP Server, NGINX, czy Apache Tomcat [2].

Źródła:

1. Łukasz Adamski, „Keycloak w praktyce. Bezpieczna autoryzacja i uwierzytelnianie”, Helion, 2020.
2. Oficjalna dokumentacja Keycloak, https://www.keycloak.org/docs/latest/securing_apps/index.html

## Architektura

## Implementacja aplikacji

### Projekt

### Implementacja

### Testowanie

### Wdrożenie

## Prezentacja

### Zarządzanie projektem

### Komunikacja i współpraca

### Zarządzanie zasobami

### Raportowanie i analiza

### Bezpieczeństwo

### Logowanie i monitoring

## Przyszłość i rozwój aplikacji

### Integracja z narzędziami maszynowego tłumaczenia

### Integracja z narzędziami do analizy tekstu

### Integracja ze słownikami terminologicznymi

### Glosariusze

### Rozbudowanie możliwości raportowania

## Podsumowanie

