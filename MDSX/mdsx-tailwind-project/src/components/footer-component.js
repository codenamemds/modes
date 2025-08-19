// This file contains the JavaScript for the footer component. 
// It handles footer rendering and any associated logic.

const FooterComponent = () => {
    return `
        <footer class="bg-gray-800 text-white py-4">
            <div class="container mx-auto text-center">
                <p class="text-sm">© 2023 Mars D. Silver. All rights reserved.</p>
                <div class="social-links mt-2">
                    <a href="#" class="text-gray-400 hover:text-white mx-2">Facebook</a>
                    <a href="#" class="text-gray-400 hover:text-white mx-2">Twitter</a>
                    <a href="#" class="text-gray-400 hover:text-white mx-2">Instagram</a>
                </div>
            </div>
        </footer>
    `;
};

export default FooterComponent;