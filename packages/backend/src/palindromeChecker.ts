export class PalindromeChecker {
  isAPalindrome(str: string): boolean {
    const reversed = str.split('').reverse().join('');
    return reversed.toLowerCase() === str.toLowerCase();
  }
}
