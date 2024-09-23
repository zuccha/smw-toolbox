// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
export const parser = LRParser.deserialize({
  version: 14,
  states: "*OQYQPOOOnQPO'#DjOsQPO'#DkOxQPO'#DlOOQO'#Di'#DiO}QQO'#C`OOQO'#C`'#C`OOQO'#Dg'#DgO!xQPO'#DfOOQO'#Df'#DfOOQO'#D^'#D^QYQPOOO#TQPO,5:UO#cQPO,5:VO#qQPO,5:WOOQO'#Cb'#CbOOQO'#Cd'#CdOOQO'#Cf'#CfO$PQQO'#ChO$eQPO'#CpO$mQPO'#CuO$uQQO'#CwO%WQQO'#DOOOQO'#DU'#DUOOQO'#DW'#DWOOQO'#Dh'#DhOOQO,58z,58zO%fQPO'#DbO%wQPO,5:QOOQO,5:Q,5:QOOQO-E7[-E7[O&SQPO'#D_O&XQPO1G/pO&gQPO'#D`O&lQPO1G/qO&zQPO'#DaO'PQPO1G/rOOQO,59U,59UOOQO,59W,59WOOQO,59m,59mO'_QQO,59[O'jQQO,59gO'rQPO,59aO'wQPO,59iOOQO,59e,59eOOQO,59f,59fOOQO,59l,59lOOQO,59|,59|OOQO-E7`-E7`OOQO1G/l1G/lOOQO,59y,59yOOQO-E7]-E7]OOQO,59z,59zOOQO-E7^-E7^OOQO,59{,59{OOQO-E7_-E7_O'|QQO1G.vO([QPO1G.wO(aQPO1G/ZOOQO1G/R1G/RO(fQPO1G/SO(kQQO1G.{OOQO1G/T1G/TOOQO7+$d7+$dOOQO7+$c7+$cO(yQQO7+$uOOQO7+$n7+$nOOQO7+$h7+$hOOQO<<Ha<<Ha",
  stateData: ")O~OPOS!XOS~ORVOTTO|PO!OQO!PRO!bXO~O][O~Ol]O~Os^O~OV_OX`OZaO]bOccOhdOleOsfOygO{hO!aSX!bSX!cSX~O!akO!bmO!cmO~O}oO!a!^a!b!^a!c!^a~O}qO!a!_a!b!_a!c!_a~O}sO!a!`a!b!`a!c!`a~O_uOavOvwO!a[X!b[X!c[X~O]xOlyO~O]zOl{O~O_|Oa}O!akX!bkX!ckX~O_!OO!arX!brX!crX~ORVOTTO|PO!OQO!PRO~O!akO!b!RO!c!RO~O]!SO~O}oO!a!^i!b!^i!c!^i~Ol!UO~O}qO!a!_i!b!_i!c!_i~Os!WO~O}sO!a!`i!b!`i!c!`i~O_!ZOb!YOv![O~O_!^Ob!]O~Og!_O~Og!`O~Oa!aO!adi!bdi!cdi~Ob!bO~Ob!cO~Ob!dO~Oa!eO!aii!bii!cii~Oa!fO~O",
  goto: "#r!aPPPP!bP!gP!gP!gP!gP!gP!gPPP!g!g!gPP!g!g!gP!g!g!g!g!g!gP!g!gP!g!gP!gPPPPP!j!p!v!|#SPPP#Y#^#e#h#m#m#mVVOZkRiTQZORnZQp[R!TpQr]R!VrQt^R!XtQlWR!QlTYOZSWOZR!PkRjTVUOZkVSOZk",
  nodeNames: "⚠ Comment Program LabelDefinition Instruction Opcode Mode_Accumulator A Mode_Immediate_Byte ConstByte Mode_Immediate_Word ConstWord Mode_DirectPage Byte Mode_DirectPage_X X Mode_DirectPage_Y Y ) ( Mode_DirectPage_Indirect Mode_DirectPage_X_Indirect Mode_DirectPage_Indirect_Y ] [ Mode_DirectPage_IndirectLong Mode_DirectPage_IndirectLong_Y Mode_Absolute Word Mode_Absolute_X Mode_Absolute_Y Mode_Absolute_Indirect Mode_Absolute_X_Indirect Mode_Absolute_IndirectLong Mode_AbsoluteLong Long Mode_AbsoluteLong_X Mode_StackRelative S Mode_StackRelative_Indirect_Y Mode_BlockMove MoveBanks Mode_Label LabelUsage DB , DW DL",
  maxTerm: 65,
  nodeProps: [
    ["openedBy", 18,"(",23,"["],
    ["closedBy", 19,")",24,"]"]
  ],
  skippedNodes: [0,1],
  repeatNodeCount: 5,
  tokenData: "NT~R!TXY$bYZ$m]^$mpq$bst$rtu*Ruv.pxy3iyz3n|}3s!O!P4k!Q![5b![!]6u!]!^6z!c!d7c!d!e8Y!e!f9t!f!g:s!g!h;V!k!l;c!l!m;i!n!o<U!o!p<k!p!q<z!q!r=Q!r!s=^!t!u>u!u!v?_!v!w@^!y!zAx!z!{BX!}#OBb#P#QBg#T#UBl#U#VC^#V#WDx#W#XEw#X#YFs#]#^GP#^#_GV#`#aGr#a#bHX#b#cHh#c#dHn#d#eHz#f#gJc#g#hJ{#h#iKz#k#lMf#l#mMu~~NO~$gQ!X~XY$bpq$b~$rO!b~~$uRtu%Ouv&X!Q![)a~%RR!Q![%[!c!i%[#T#Z%[~%_R!Q![%h!c!i%h#T#Z%h~%mRX~!Q![%v!c!i%v#T#Z%v~%yR!Q![&S!c!i&S#T#Z&S~&XOZ~~&[Q!Q!R&b!R!S&b~&eQ!Q!R&k!R!S&k~&nQ!Q!R&t!R!S&t~&wQ!Q!R&}!R!S&}~'QQ!Q!R'W!R!S'W~'ZQ!Q!R'a!R!S'a~'dQ!Q!R'j!R!S'j~'mQ!Q!R's!R!S's~'xQX~!Q!R(O!R!S(O~(RQ!Q!R(X!R!S(X~([Q!Q!R(b!R!S(b~(eQ!Q!R(k!R!S(k~(nQ!Q!R(t!R!S(t~(wQ!Q!R(}!R!S(}~)QQ!Q!R)W!R!S)W~)ZQ!Q!R&S!R!S&S~)fPX~!Q![)i~)nPX~!Q![)q~)vPX~!Q![)y~*OPZ~!Q![&S~*UR!Q![*_!c!i*_#T#Z*_~*bR!Q![*k!c!i*k#T#Z*k~*pS]~|}*|!Q![-s!c!i-s#T#Z-s~+PRtu+Yuv+w!Q![-c~+]R!Q![+f!c!i+f#T#Z+f~+iR!Q![+r!c!i+r#T#Z+r~+wOy~~+zQ!Q!R,Q!R!S,Q~,TQ!Q!R,Z!R!S,Z~,^Q!Q!R,d!R!S,d~,gQ!Q!R,m!R!S,m~,pQ!Q!R,v!R!S,v~,yQ!Q!R-P!R!S-P~-SQ!Q!R-Y!R!S-Y~-]Q!Q!R+r!R!S+r~-hPy~!Q![-k~-pPy~!Q![+r~-vR!Q![.P!c!i.P#T#Z.P~.URl~!Q![._!c!i._#T#Z._~.bR!Q![.k!c!i.k#T#Z.k~.pOs~~.sQ!Q!R.y!R!S.y~.|Q!Q!R/S!R!S/S~/VQ!Q!R/]!R!S/]~/`Q!Q!R/f!R!S/f~/iQ!Q!R/o!R!S/o~/rQ!Q!R/x!R!S/x~/{Q!Q!R0R!R!S0R~0UQ!Q!R0[!R!S0[~0aR]~|}*|!Q!R0j!R!S0j~0mQ!Q!R0s!R!S0s~0vQ!Q!R0|!R!S0|~1PQ!Q!R1V!R!S1V~1YQ!Q!R1`!R!S1`~1cQ!Q!R1i!R!S1i~1lQ!Q!R1r!R!S1r~1uQ!Q!R1{!R!S1{~2QQl~!Q!R2W!R!S2W~2ZQ!Q!R2a!R!S2a~2dQ!Q!R2j!R!S2j~2mQ!Q!R2s!R!S2s~2vQ!Q!R2|!R!S2|~3PQ!Q!R3V!R!S3V~3YQ!Q!R3`!R!S3`~3cQ!Q!R.k!R!S.k~3nOc~~3sOb~R3xU}P!u!v4[!z!{4a!{!|4f#g#h4[#l#m4a#m#n4fQ4aOvQQ4fO_QQ4kOaQR4nR!c!}4w#R#S4w#T#o4wR4|T{Q!Q![4w![!]5]!c!}4w#R#S4w#T#o4wP5bORP~5gQ]~|}*|!Q![5m~5rQ]~|}*|!Q![5x~5}Q]~|}*|!Q![6T~6YPl~!Q![6]~6bPl~!Q![6e~6jPs~!Q![6m~6rPs~!Q![.k~6zO!a~~7PSP~OY6zZ;'S6z;'S;=`7]<%lO6z~7`P;=`<%l6zR7hRVQ!f!g7q!p!q7|!u!v8SP7tP!e!f7wP7|OTPP8PP!f!g7wP8VP!n!o7wP8]W!e!f8u!g!h9O!k!l9U!o!p9[!p!q9b!r!s8S!t!u9h!x!y8uP8xQ!e!f7w!u!v7wP9RP!s!t7wP9XP!v!w7wP9_P!k!l7wP9eP!g!h7wP9kR!c!d7w!m!n7w!n!o7wP9wS!n!o:T!o!p:d!q!r:d!r!s:jP:WS!e!f7w!f!g7w!k!l7w!x!y7wP:gP!r!s7wP:mQ!z!{7w!{!|7wP:vP!g!h:yP:|R!e!f7w!z!{7w!{!|7wP;YP!q!r;]P;`P!t!u7wP;fP!p!q:yP;lQ!o!p;r!u!v;{P;uQ!n!o7w!r!s7wP<OQ!n!o7w!t!u7wP<XQ!f!g<_!u!v;]P<bR!c!d7w!z!{7w!{!|7wP<nP!x!y<qP<tQ!p!q7w!r!s7wP<}P!q!r:dP=TP!t!u=WP=ZP!c!d7wP=aR!g!h=j!j!k=v!n!o>`P=mR!c!d7w!k!l7w!t!u7wP=yV!c!d7w!d!e7w!f!g7w!m!n7w!r!s7w!z!{7w!{!|7wP>cU!c!d7w!d!e7w!f!g7w!r!s7w!z!{7w!{!|7wP>xR!g!h:d!q!r;{!v!w?RP?UR!k!l7w!n!o7w!u!v7wP?bR!d!e7q!g!h?k!v!w?zP?nS!e!f7w!f!g7w!k!l7w!r!s7wP?}T!c!d7w!r!s7w!z!{7w!{!|7w!|!}7wP@aV!c!d:j!e!f@v!f!g7q!t!uAP!u!vAV!z!{Ac!{!|AoP@yQ!f!g7w!u!v7wPASP!d!e7wPAYR!d!e7w!e!f7w!z!{7wPAfR!c!d7w!u!v7w!{!|7wPArQ!c!d7w!z!{7wPA{Q!c!d9[!f!gBRPBUP!o!p7wPB[Q!d!e=W!e!f9b~BgOh~~BlOg~RBqRVQ#W#XBz#b#cCQ#g#hCWPB}P#V#W7wPCTP#W#X7wPCZP#`#a7wPCaW#V#WCy#X#YDS#]#^DY#a#bD`#b#cDf#d#eCW#f#gDl#j#kCyPC|Q#V#W7w#g#h7wPDVP#e#f7wPD]P#h#i7wPDcP#]#^7wPDiP#X#Y7wPDoR#T#U7w#_#`7w#`#a7wPD{S#`#aEX#a#bEh#c#dEh#d#eEnPE[S#V#W7w#W#X7w#]#^7w#j#k7wPEkP#d#e7wPEqQ#l#m7w#m#n7w~EzS#U#VFW#X#YF]#`#aFi#k#lFn~F]O|~PF`R#V#W7w#l#m7w#m#n7w~FnO!P~~FsO!O~PFvP#c#dFyPF|P#f#g7wPGSP#b#cF]PGYQ#a#bG`#g#hGiPGcQ#`#a7w#d#e7wPGlQ#`#a7w#f#g7wPGuQ#W#XG{#g#hFyPHOR#T#U7w#l#m7w#m#n7wPH[P#j#kH_PHbQ#b#c7w#d#e7wPHkP#c#dEhPHqP#f#gHtPHwP#T#U7wPH}R#X#YIW#[#]Id#`#aI|PIZR#T#U7w#]#^7w#f#g7wPIgV#T#U7w#U#V7w#W#X7w#_#`7w#d#e7w#l#m7w#m#n7wPJPU#T#U7w#U#V7w#W#X7w#d#e7w#l#m7w#m#n7wPJfR#X#YEh#c#dGi#h#iJoPJrR#]#^7w#`#a7w#g#h7wPKOR#U#VBz#X#YKX#h#iKhPK[S#V#W7w#W#X7w#]#^7w#d#e7wPKkT#T#U7w#d#e7w#l#m7w#m#n7w#n#o7wPK}V#T#UEn#V#WLd#W#XBz#f#gLm#g#hLs#l#mMP#m#nM]PLgQ#W#X7w#g#h7wPLpP#U#V7wPLvR#U#V7w#V#W7w#l#m7wPMSR#T#U7w#g#h7w#m#n7wPM`Q#T#U7w#l#m7wPMiQ#T#UD`#W#XMoPMrP#a#b7wPMxQ#U#VHt#V#WDf~NTO!c~",
  tokenizers: [0, 1],
  topRules: {"Program":[0,2]},
  tokenPrec: 0
})
