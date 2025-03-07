/**
 * Helper script for creating new blog posts
 * 
 * This script helps replace the ROOT_PATH placeholder in the post template
 * with the appropriate relative path based on the post's directory depth.
 */

/**
 * Replaces ROOT_PATH placeholder with the appropriate relative path
 * @param {string} templateContent - The content of the post template
 * @param {number} directoryDepth - The depth of the post directory (e.g., 4 for posts/YYYY/MM/DD/)
 * @returns {string} - The template content with ROOT_PATH replaced
 */
function replaceRootPath(templateContent, directoryDepth) {
    const relativePath = '../'.repeat(directoryDepth);
    return templateContent.replace(/ROOT_PATH\//g, relativePath);
}

/**
 * Creates a new post file from the template
 * @param {string} templatePath - Path to the template file
 * @param {string} outputPath - Path where the new post should be saved
 * @param {Object} replacements - Object with key-value pairs for replacements (e.g., {POST_TITLE: 'My New Post'})
 */
function createPostFromTemplate(templatePath, outputPath, replacements) {
    // This is a placeholder for a Node.js implementation
    // In a real implementation, this would:
    // 1. Read the template file
    // 2. Calculate directory depth from outputPath
    // 3. Replace ROOT_PATH with the appropriate relative path
    // 4. Replace other placeholders with values from replacements
    // 5. Write the result to outputPath
    
    console.log(`Creating post at ${outputPath} from template ${templatePath}`);
    console.log('Replacements:', replacements);
    
    // Example directory depth calculation:
    // For a post at posts/2025/03/07/my-post.html, the depth would be 4
    const directoryDepth = outputPath.split('/').length - 1;
    console.log(`Directory depth: ${directoryDepth}`);
    console.log(`Relative path to root: ${'../'.repeat(directoryDepth)}`);
}

// Example usage (for documentation purposes):
/*
createPostFromTemplate(
    'templates/post-template.html',
    'posts/2025/03/10/my-new-post.html',
    {
        POST_TITLE: 'My New Post',
        POST_DATE: 'March 10, 2025',
        POST_DESCRIPTION: 'Description of my new post'
    }
);
*/ 