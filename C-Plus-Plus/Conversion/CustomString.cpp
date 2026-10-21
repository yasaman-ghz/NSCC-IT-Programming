#include "CustomString.h"
#include <string>

using namespace std;

string replaceWithEscape(const string &line) {  //Reference(related to passing by reference): https://stackoverflow.com/questions/4475634/pass-a-string-in-c
    string buffer = "";

    for (char c : line) {
        if (c == '<') {
            buffer += "&lt";
        } else if (c == '>'){
            buffer += "&gt";
        } else {
            buffer += c;
        }
    }

    return buffer;
}