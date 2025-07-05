declare module 'koa-swig' {
  import { Context } from 'koa';

  interface KoaSwigOptions {
    /**
     * Root directory for templates
     */
    root?: string;
    
    /**
     * Template cache options
     */
    cache?: boolean | 'memory';
    
    /**
     * Template file extension
     */
    ext?: string;
    
    /**
     * Whether to auto-escape template variables
     */
    autoescape?: boolean;
    
    /**
     * Custom filters for templates
     */
    filters?: { [key: string]: Function };
    
    /**
     * Custom tags for templates
     */
    tags?: { [key: string]: Function };
    
    /**
     * Template variable start and end delimiters
     */
    varControls?: [string, string];
    
    /**
     * Template tag start and end delimiters
     */
    tagControls?: [string, string];
    
    /**
     * Template comment start and end delimiters
     */
    cmtControls?: [string, string];
    
    /**
     * Local variables available to all templates
     */
    locals?: { [key: string]: any };
    
    /**
     * Custom loader function
     */
    loader?: Function;
    
    /**
     * Whether to write compiled templates to cache
     */
    writeBody?: boolean;
  }

  interface RenderedSwig {
    /**
     * Set local variables
     */
    setLocals(args: { [key: string]: any }): void;

    /**
     * Get local variable by key
     */
    getLocals(key: string): any;
    
    /**
     * Get all local variables
     */
    getLocals(): { [key: string]: any };
    
    /**
     * Set a single local variable
     */
    setLocal(key: string, value: any): void;
    
    /**
     * Set custom filter
     */
    setFilter(name: string, filter: Function): void;
    
    /**
     * Set custom tag
     */
    setTag(name: string, tag: Function): void;
    
    /**
     * Render template with given context
     */
    render(template: string, context?: { [key: string]: any }): string;
    
    /**
     * Render template file with given context
     */
    renderFile(path: string, context?: { [key: string]: any }): string;
    
    /**
     * Compile template string
     */
    compile(template: string, options?: any): Function;
    
    /**
     * Compile template file
     */
    compileFile(path: string, options?: any): Function;
  }

  interface SwigRenderer {
    (view: string, options?: { [key: string]: any }): Promise<string>;
  }

  interface KoaSwigRenderer {
    (settings?: KoaSwigOptions): (
      ctx: Context
    ) => Generator<Promise<string>, void, unknown>;
  }

  interface KoaSwigMiddleware {
    /**
     * Render template
     */
    render(view: string, locals?: { [key: string]: any }): Promise<string>;
    
    /**
     * Set response body with rendered template
     */
    renderView(view: string, locals?: { [key: string]: any }): Promise<void>;
  }

  // Extend Koa Context to include render methods
  module 'koa' {
    interface Context {
      render: KoaSwigMiddleware['render'];
      renderView: KoaSwigMiddleware['renderView'];
    }
  }

  const renderer: KoaSwigRenderer & {
    swig: RenderedSwig;
  };

  export = renderer;
}