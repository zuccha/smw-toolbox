// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
export const parser = LRParser.deserialize({
  version: 14,
  states: "&fQYQPOOObQQO'#C_O!VQPO'#DZOOQO'#DZ'#DZOOQO'#DV'#DVQYQPOOOOQO'#Ca'#CaOOQO'#Cc'#CcOOQO'#Ce'#CeO!_QPO'#CgO!pQPO'#CoO!xQPO'#CtO#QQPO'#CvO#`QPO'#C}OOQO'#DT'#DTOOQO'#D['#D[OOQO,58y,58yOOQO,59u,59uOOQO-E7T-E7TOOQO,59T,59TOOQO,59V,59VOOQO,59l,59lO#kQPO,59ZO#vQPO,59fO$OQPO,59`O$TQPO,59hOOQO,59d,59dOOQO,59e,59eOOQO,59k,59kO$YQPO1G.uO$eQPO1G.vO$jQPO1G/YOOQO1G/Q1G/QO$oQPO1G/RO$tQPO1G.zOOQO1G/S1G/SOOQO7+$c7+$cOOQO7+$b7+$bO%PQPO7+$tOOQO7+$m7+$mOOQO7+$g7+$gOOQO<<H`<<H`",
  stateData: "%U~OPOS|OS~OSPO!PRO~OUUOWVOYWO[XObYOgZOk[Or]Ox^O!PRX!QRX~O!PaO!QaO~O^cO`dOueO!PZX!QZX~O[fOkgO~O[hOkiO~O^jO`kO!PjX!QjX~O^lO!PqX!QqX~O^nOamOuoO~O^qOapO~OfrO~OfsO~O`tO!Pci!Qci~OauO~OavO~OawO~O`xO!Phi!Qhi~O`yO~O",
  goto: "!f!PPPP!QP!UP!UP!UP!UP!UP!UPPP!U!U!UPP!U!U!UP!U!U!U!U!U!UP!U!UP!U!UP!XPPP!_!cTQOTR_PQTORbTTSOTR`P",
  nodeNames: "⚠ Comment Program Instruction Opcode Mode_Accumulator A Mode_Immediate_Byte ConstByte Mode_Immediate_Word ConstWord Mode_DirectPage Byte Mode_DirectPage_X X Mode_DirectPage_Y Y ) ( Mode_DirectPage_Indirect Mode_DirectPage_X_Indirect Mode_DirectPage_Indirect_Y ] [ Mode_DirectPage_IndirectLong Mode_DirectPage_IndirectLong_Y Mode_Absolute Word Mode_Absolute_X Mode_Absolute_Y Mode_Absolute_Indirect Mode_Absolute_X_Indirect Mode_Absolute_IndirectLong Mode_AbsoluteLong Long Mode_AbsoluteLong_X Mode_StackRelative S Mode_StackRelative_Indirect_Y Mode_BlockMove MoveBanks",
  maxTerm: 48,
  nodeProps: [
    ["openedBy", 17,"(",22,"["],
    ["closedBy", 18,")",23,"]"]
  ],
  skippedNodes: [0,1],
  repeatNodeCount: 1,
  tokenData: "Lv~R!RXY$[YZ$g]^$gpq$[st$ltu){uv.jxy3cyz3h|}3m!Q![4c!]!^5v!c!d6_!d!e7U!e!f8p!f!g9o!g!h:R!k!l:_!l!m:e!n!o;Q!o!p;g!p!q;v!q!r;|!r!s<Y!t!u=q!u!v>Z!v!w?Y!y!z@t!z!{AT!}#OAv#P#QA{#T#UBQ#U#VBi#V#WDT#W#XES#X#YEf#]#^Er#^#_Ex#`#aFe#a#bFz#b#cGZ#c#dGa#d#eGm#f#gIU#g#hIn#h#iJm#k#lLX#l#mLh~~Lq~$aQ|~XY$[pq$[~$lO!P~~$oRtu$xuv&R!Q![)Z~${R!Q![%U!c!i%U#T#Z%U~%XR!Q![%b!c!i%b#T#Z%b~%gRW~!Q![%p!c!i%p#T#Z%p~%sR!Q![%|!c!i%|#T#Z%|~&ROY~~&UQ!Q!R&[!R!S&[~&_Q!Q!R&e!R!S&e~&hQ!Q!R&n!R!S&n~&qQ!Q!R&w!R!S&w~&zQ!Q!R'Q!R!S'Q~'TQ!Q!R'Z!R!S'Z~'^Q!Q!R'd!R!S'd~'gQ!Q!R'm!R!S'm~'rQW~!Q!R'x!R!S'x~'{Q!Q!R(R!R!S(R~(UQ!Q!R([!R!S([~(_Q!Q!R(e!R!S(e~(hQ!Q!R(n!R!S(n~(qQ!Q!R(w!R!S(w~(zQ!Q!R)Q!R!S)Q~)TQ!Q!R%|!R!S%|~)`PW~!Q![)c~)hPW~!Q![)k~)pPW~!Q![)s~)xPY~!Q![%|~*OR!Q![*X!c!i*X#T#Z*X~*[R!Q![*e!c!i*e#T#Z*e~*jS[~|}*v!Q![-m!c!i-m#T#Z-m~*yRtu+Suv+q!Q![-]~+VR!Q![+`!c!i+`#T#Z+`~+cR!Q![+l!c!i+l#T#Z+l~+qOx~~+tQ!Q!R+z!R!S+z~+}Q!Q!R,T!R!S,T~,WQ!Q!R,^!R!S,^~,aQ!Q!R,g!R!S,g~,jQ!Q!R,p!R!S,p~,sQ!Q!R,y!R!S,y~,|Q!Q!R-S!R!S-S~-VQ!Q!R+l!R!S+l~-bPx~!Q![-e~-jPx~!Q![+l~-pR!Q![-y!c!i-y#T#Z-y~.ORk~!Q![.X!c!i.X#T#Z.X~.[R!Q![.e!c!i.e#T#Z.e~.jOr~~.mQ!Q!R.s!R!S.s~.vQ!Q!R.|!R!S.|~/PQ!Q!R/V!R!S/V~/YQ!Q!R/`!R!S/`~/cQ!Q!R/i!R!S/i~/lQ!Q!R/r!R!S/r~/uQ!Q!R/{!R!S/{~0OQ!Q!R0U!R!S0U~0ZR[~|}*v!Q!R0d!R!S0d~0gQ!Q!R0m!R!S0m~0pQ!Q!R0v!R!S0v~0yQ!Q!R1P!R!S1P~1SQ!Q!R1Y!R!S1Y~1]Q!Q!R1c!R!S1c~1fQ!Q!R1l!R!S1l~1oQ!Q!R1u!R!S1u~1zQk~!Q!R2Q!R!S2Q~2TQ!Q!R2Z!R!S2Z~2^Q!Q!R2d!R!S2d~2gQ!Q!R2m!R!S2m~2pQ!Q!R2v!R!S2v~2yQ!Q!R3P!R!S3P~3SQ!Q!R3Y!R!S3Y~3]Q!Q!R.e!R!S.e~3hOb~~3mOa~~3pU!u!v4S!z!{4X!{!|4^#g#h4S#l#m4X#m#n4^~4XOu~~4^O^~~4cO`~~4hQ[~|}*v!Q![4n~4sQ[~|}*v!Q![4y~5OQ[~|}*v!Q![5U~5ZPk~!Q![5^~5cPk~!Q![5f~5kPr~!Q![5n~5sPr~!Q![.e~5{SP~OY5vZ;'S5v;'S;=`6X<%lO5v~6[P;=`<%l5vR6dRUQ!f!g6m!p!q6x!u!v7OP6pP!e!f6sP6xOSPP6{P!f!g6sP7RP!n!o6sP7XW!e!f7q!g!h7z!k!l8Q!o!p8W!p!q8^!r!s7O!t!u8d!x!y7qP7tQ!e!f6s!u!v6sP7}P!s!t6sP8TP!v!w6sP8ZP!k!l6sP8aP!g!h6sP8gR!c!d6s!m!n6s!n!o6sP8sS!n!o9P!o!p9`!q!r9`!r!s9fP9SS!e!f6s!f!g6s!k!l6s!x!y6sP9cP!r!s6sP9iQ!z!{6s!{!|6sP9rP!g!h9uP9xR!e!f6s!z!{6s!{!|6sP:UP!q!r:XP:[P!t!u6sP:bP!p!q9uP:hQ!o!p:n!u!v:wP:qQ!n!o6s!r!s6sP:zQ!n!o6s!t!u6sP;TQ!f!g;Z!u!v:XP;^R!c!d6s!z!{6s!{!|6sP;jP!x!y;mP;pQ!p!q6s!r!s6sP;yP!q!r9`P<PP!t!u<SP<VP!c!d6sP<]R!g!h<f!j!k<r!n!o=[P<iR!c!d6s!k!l6s!t!u6sP<uV!c!d6s!d!e6s!f!g6s!m!n6s!r!s6s!z!{6s!{!|6sP=_U!c!d6s!d!e6s!f!g6s!r!s6s!z!{6s!{!|6sP=tR!g!h9`!q!r:w!v!w=}P>QR!k!l6s!n!o6s!u!v6sP>^R!d!e6m!g!h>g!v!w>vP>jS!e!f6s!f!g6s!k!l6s!r!s6sP>yT!c!d6s!r!s6s!z!{6s!{!|6s!|!}6sP?]V!c!d9f!e!f?r!f!g6m!t!u?{!u!v@R!z!{@_!{!|@kP?uQ!f!g6s!u!v6sP@OP!d!e6sP@UR!d!e6s!e!f6s!z!{6sP@bR!c!d6s!u!v6s!{!|6sP@nQ!c!d6s!z!{6sP@wQ!c!d8W!f!g@}PAQP!o!p6sPAWQ!d!e<S!e!fA^PAaP!g!hAdPAgP#T#UAjPAmP#W#XApPAsP#V#W6s~A{Og~~BQOf~RBVQUQ#b#cB]#g#hBcPB`P#W#X6sPBfP#`#a6sPBlW#V#WCU#X#YC_#]#^Ce#a#bCk#b#cCq#d#eBc#f#gCw#j#kCUPCXQ#V#W6s#g#h6sPCbP#e#f6sPChP#h#i6sPCnP#]#^6sPCtP#X#Y6sPCzR#T#U6s#_#`6s#`#a6sPDWS#`#aDd#a#bDs#c#dDs#d#eDyPDgS#V#W6s#W#X6s#]#^6s#j#k6sPDvP#d#e6sPD|Q#l#m6s#m#n6sPEVP#X#YEYPE]R#V#W6s#l#m6s#m#n6sPEiP#c#dElPEoP#f#g6sPEuP#b#cEYPE{Q#a#bFR#g#hF[PFUQ#`#a6s#d#e6sPF_Q#`#a6s#f#g6sPFhQ#W#XFn#g#hElPFqR#T#U6s#l#m6s#m#n6sPF}P#j#kGQPGTQ#b#c6s#d#e6sPG^P#c#dDsPGdP#f#gGgPGjP#T#U6sPGpR#X#YGy#[#]HV#`#aHoPG|R#T#U6s#]#^6s#f#g6sPHYV#T#U6s#U#V6s#W#X6s#_#`6s#d#e6s#l#m6s#m#n6sPHrU#T#U6s#U#V6s#W#X6s#d#e6s#l#m6s#m#n6sPIXR#X#YDs#c#dF[#h#iIbPIeR#]#^6s#`#a6s#g#h6sPIqR#U#VAp#X#YIz#h#iJZPI}S#V#W6s#W#X6s#]#^6s#d#e6sPJ^T#T#U6s#d#e6s#l#m6s#m#n6s#n#o6sPJpV#T#UDy#V#WKV#W#XAp#f#gK`#g#hKf#l#mKr#m#nLOPKYQ#W#X6s#g#h6sPKcP#U#V6sPKiR#U#V6s#V#W6s#l#m6sPKuR#T#U6s#g#h6s#m#n6sPLRQ#T#U6s#l#m6sPL[Q#T#UCk#W#XLbPLeP#a#b6sPLkQ#U#VGg#V#WCq~LvO!Q~",
  tokenizers: [0, 1],
  topRules: {"Program":[0,2]},
  tokenPrec: 0
})
