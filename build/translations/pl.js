(function(d){	const l = d['pl'] = d['pl'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"%0 z %1","Block quote":"Cytat blokowy",Bold:"Pogrubienie","Bulleted List":"Lista wypunktowana",Cancel:"Anuluj","Cannot upload file:":"Nie można przesłać pliku:","Centered image":"Obraz wyrównany do środka","Change image text alternative":"Zmień tekst zastępczy obrazka","Choose heading":"Wybierz nagłówek",Code:"Kod",Column:"Kolumna","Decrease indent":"Zmniejsz wcięcie","Delete column":"Usuń kolumnę","Delete row":"Usuń wiersz",Downloadable:"Do pobrania","Dropdown toolbar":"Rozwijany pasek narzędzi","Edit link":"Edytuj odnośnik","Editor toolbar":"Pasek narzędzi edytora","Enter image caption":"Wstaw tytuł obrazka","Full size image":"Obraz w pełnym rozmiarze","Header column":"Kolumna nagłówka","Header row":"Wiersz nagłówka",Heading:"Nagłówek","Heading 1":"Nagłówek 1","Heading 2":"Nagłówek 2","Heading 3":"Nagłówek 3","Heading 4":"Nagłówek 4","Heading 5":"Nagłówek 5","Heading 6":"Nagłówek 6","Image toolbar":"Pasek narzędzi obrazka","image widget":"Obraz","Increase indent":"Zwiększ wcięcie","Insert code block":"Wstaw blok kodu","Insert column left":"Wstaw kolumnę z lewej","Insert column right":"Wstaw kolumnę z prawej","Insert image":"Wstaw obraz","Insert paragraph after block":"","Insert paragraph before block":"","Insert row above":"Wstaw wiersz ponad","Insert row below":"Wstaw wiersz poniżej","Insert table":"Wstaw tabelę",Italic:"Kursywa","Left aligned image":"Obraz wyrównany do lewej",Link:"Wstaw odnośnik","Link URL":"Adres URL","Merge cell down":"Scal komórkę w dół","Merge cell left":"Scal komórkę w lewo","Merge cell right":"Scal komórkę w prawo","Merge cell up":"Scal komórkę w górę","Merge cells":"Scal komórki",Next:"Następny","Numbered List":"Lista numerowana","Open in a new tab":"Otwórz w nowej zakładce","Open link in new tab":"Otwórz odnośnik w nowym oknie",Paragraph:"Akapit","Plain text":"Zwykły tekst",Previous:"Poprzedni",Redo:"Ponów","Rich Text Editor":"Edytor tekstu sformatowanego","Rich Text Editor, %0":"Edytor tekstu sformatowanego, %0","Right aligned image":"Obraz wyrównany do prawej",Row:"Wiersz",Save:"Zapisz","Select all":"Zaznacz wszystko","Select column":"","Select row":"","Show more items":"Pokaż więcej","Side image":"Obraz dosunięty do brzegu, oblewany tekstem","Split cell horizontally":"Podziel komórkę poziomo","Split cell vertically":"Podziel komórkę pionowo",Strikethrough:"Przekreślenie",Subscript:"Indeks dolny",Superscript:"Indeks górny","Table toolbar":"Pasek narzędzi tabel","Text alternative":"Tekst zastępczy obrazka","This link has no URL":"Nie podano adresu URL odnośnika",Underline:"Podkreślenie",Undo:"Cofnij",Unlink:"Usuń odnośnik","Upload failed":"Przesyłanie obrazu nie powiodło się","Upload in progress":"Trwa przesyłanie","Widget toolbar":"Pasek widgetów"}	);l.getPluralForm=function(n){return (n==1 ? 0 : (n%10>=2 && n%10<=4) && (n%100<12 || n%100>14) ? 1 : n!=1 && (n%10>=0 && n%10<=1) || (n%10>=5 && n%10<=9) || (n%100>=12 && n%100<=14) ? 2 : 3);;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));