#include "CustomString.h"
#include "CustomException.h"
#include <iostream>
#include <fstream>   // Reference: https://www.w3schools.com/cpp/cpp_files.asp
#include <string>
#include <regex>

using namespace std;
int main() {

    bool nameBool = false;
    string fileName;
    do {
        cout << "Please enter your file name (excluding .cpp extension) here:\n";

        getline(cin, fileName); //Reference: https://www.scaler.com/topics/getline-in-cpp/


        if (fileName.empty()) {
            cout << "Filename cannot be empty...\n";
            nameBool = true;
            continue;
        }

        //Reference(understanding): https://learn.microsoft.com/en-us/cpp/standard-library/regular-expressions-cpp?view=msvc-170
        //Reference(what should be included): https://gist.github.com/doctaphred/d01d05291546186941e1b7ddc02034d3
        const regex namePattern(R"([\\/:*?"<>|\x00-\x1F]|^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$|[ .]$)");


        nameBool = regex_search(fileName, namePattern);

        if (nameBool) {
            cout << "Oops! Please make sure the name format is correct for windows." << endl;
        }

    } while (nameBool);

    bool pathBool = true;
    string filePath;
    do {
        cout << "Please specify a path to your file: " << endl;
        getline(cin, filePath); //Reference: https://www.scaler.com/topics/getline-in-cpp/
        const regex pathPattern(R"(^[A-Z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*$)");  //Reference: https://regex-snippets.com/windows-path
        pathBool = regex_match(filePath, pathPattern);
        if (!pathBool) {
            cout << "Oops!... Please make sure the path format is correct (e.g. \"C:\\myfolder\\\" or \"C:\\\").\n";
        }
    } while (!pathBool);


    bool newNameBool = false;
    string newFileName;
    do {
        cout << "Please enter your file name (excluding .html) here:  \nWARNING: If there's an already existing file with the same name and extension, it will be overwritten!\n";
        //Reference: https://www.scaler.com/topics/getline-in-cpp/
        //cin.ignore(numeric_limits<streamsize>::max(), '\n');


        getline(cin, newFileName);//Reference: https://www.scaler.com/topics/getline-in-cpp/


        if (newFileName.empty()) {
            cout << "Filename cannot be empty...\n";
            newNameBool = true;
            continue;
        }

        //Reference(understanding): https://learn.microsoft.com/en-us/cpp/standard-library/regular-expressions-cpp?view=msvc-170
        //Reference(what should be included): https://gist.github.com/doctaphred/d01d05291546186941e1b7ddc02034d3
        const regex namePattern(R"([\\/:*?"<>|\x00-\x1F]|^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$|[ .]$)");   // you forgot length validation


        newNameBool = regex_search(newFileName, namePattern);

        if (newNameBool) {
            cout << "Oh! Please make sure the name format is correct for windows." << endl;
        }
    } while (newNameBool);


    bool newPathBool = true;
    string newFilePath;
    do {
        cout << "Please specify a path to your file: " << endl;
        getline(cin, newFilePath);  //Reference: https://www.scaler.com/topics/getline-in-cpp/
        const regex pathPattern(R"(^[A-Z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*$)"); //Reference: https://regex-snippets.com/windows-path
        newPathBool = regex_match(newFilePath, pathPattern);
        if (!newPathBool) {
            cout << "Oh!... Please make sure the new path format is correct (e.g. \"C:\\myfolder\\\" or \"C:\\\").\n.";
        }
    } while (!newPathBool);


    fstream cppFile;
    fstream htmlFile;
    try {// Reference: https://www.youtube.com/watch?v=5nCXSDv6e4I
        cppFile.open(filePath+fileName+".cpp", ios::in);// Reference: https://www.youtube.com/watch?v=EaHFhms_Shw
        htmlFile.open(newFilePath+newFileName+".html", ios::out);

        string line;
        htmlFile << "<PRE>" << endl;
        while (getline(cppFile, line)) {
            htmlFile << replaceWithEscape(line) << endl;
        }
        htmlFile << "</PRE>" << endl;

        cppFile.close();
        htmlFile.close();
        throw MyCustomException(cppFile,htmlFile);

    } catch (MyCustomException& e) {
        cout << e.what() << endl;
    } catch (logic_error &e) {
        cout << e.what() << endl;
    } catch (runtime_error &e) {
        cout << e.what() << endl;
    } catch (exception &e) {
        cout << e.what() << endl;
    }

    return 0;
}