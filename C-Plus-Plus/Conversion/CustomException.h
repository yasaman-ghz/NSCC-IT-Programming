
#ifndef CONVERSION_CUSTOMEXCEPTION_H  // Reference(related to creation of this file): https://stackoverflow.com/questions/30713448/c-struct-prototyping-in-separate-header-file
#define CONVERSION_CUSTOMEXCEPTION_H

#include <stdexcept>
#include <fstream>
#include <string>
using namespace std;
struct MyCustomException : public exception {

    fstream input;
    fstream output;

    MyCustomException(fstream &fin, fstream &fout)
        : input(std::move(fin)), output(std::move(fout)) {}


const char* what() {
        if (!input.is_open() || !output.is_open()) {
            return "FILE OPENING ERROR: One or both files failed to open...";
        }
        if (input.bad()) {
            return "INPUT FILE ERROR: A critical unrecoverable corruption error (.bad()) occurred.";
        }
        if (input.fail()) {
            return "INPUT FILE ERROR: A logical reading error (.fail()) occurred.";
        }
        if (output.fail() || output.bad()) {
            return "OUTPUT FILE ERROR: Writing to the output file failed (.fail()/.bad()).";
        }
        return "UNKNOWN FILE I/O ERROR.";
    }
};

#endif
